import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import SensorDataFetcher from "../../components/SensorDataFetcher";
import { SensorData } from "../../types/SensorData";

const { width } = Dimensions.get("window");

const BabyMonitorGraphPage: React.FC = () => {
  //track possible available data points for graph y-axis label display
  const numSlicedDataPoints: number = 5;

  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("hourly");
  const [selectedGraph, setSelectedGraph] = useState<string>("line");
  const [selectedParameter, setSelectedParameter] =
    useState<string>("baby_temperature");

  const timeframes = ["hourly", "daily", "weekly"];
  const graphTypes = ["line", "bar"];
  const parameters = [
    { key: "baby_temperature", label: "Temperature", unit: "°C" },
    { key: "spo2", label: "SpO2", unit: "%" },
    { key: "heart_rate", label: "Heart Rate", unit: "bpm" },
  ];
  useEffect(() => {
    renderGraph();
  }, [selectedTimeframe]);

  // Format data for graph
  // get the sensor value in a neat display format
  function getFormattedValue(item: SensorData) {
    let value: number;
    switch (selectedParameter) {
      case "baby_temperature":
        value = parseFloat(item.baby_temperature.toFixed(1));
        break;
      case "spo2":
        value = item.spo2;
        break;
      case "heart_rate":
        value = item.heartRate;
        break;
      default:
        value = 0;
    }

    return {
      value: isNaN(value) ? 0 : value,
      //item.timestamp.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }) + "-" +
      label: item.timestamp.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit" /*, second: '2-digit'*/,
      }),
      //("dd/mm hh:MM")
    };
  }

  //Calculate ISO8601 Weeknumber, note there may be a 52nd/53rd week leading into the next year normally
  function leftFillNum(num: number, targetLength: number) {
    return num.toString().padStart(targetLength, "0");
  }

  function getWeekDifference(timestamp1: number, timestamp2: number) {
    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(timestamp2 - timestamp1);

    // Calculate the number of milliseconds in a week
    // 1000 * 60 * 60 * 24=86400000 ms in a day
    // we need to find per week and hence divide by 7 further
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;

    // Calculate the difference in weeks
    const diffInWeeks = Math.ceil(diffInMs / msPerWeek);

    return diffInWeeks;
  }

  //get Week number for a Date
  function getWeekNumber(d: Date) {
    // Copy date so don't modify original
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNum = getWeekDifference(d.valueOf(), yearStart.valueOf());
    //console.log("getWeekNumber: " + weekNum);
    // Return custom string of year and week number - eg. 2023-W03
    return d.getFullYear() + "-W" + leftFillNum(weekNum, 2);
  }

  // calculate Daily or Weekly average
  const calcReqAvg = (
    daily_or_weekly: "daily" | "weekly",
    ds: SensorData[],
    selectedParameter: string
  ) => {
    let acc = new Map();
    ds.forEach((cur: SensorData) => {
      let key: string =
        daily_or_weekly === "daily"
          ? cur.timestamp.getDate() +
            "/" +
            (cur.timestamp.getMonth() + 1) +
            "/" +
            cur.timestamp.getFullYear()
          : getWeekNumber(cur.timestamp);

      let a: any = {
        // get the sensor value in a neat display format
        value: getFormattedValue(cur).value,
        //default count is 1 till we find in accumulator
        count: 1,
      };
      //check the accumulator and store the sum of values and count of data points
      if (acc.get(key)) {
        a.value = a.value + parseFloat(acc.get(key).value);
        a.count = parseInt(acc.get(key).count) + 1;
      }
      acc.set(key, a); //store this new value in the accumulator
    });

    var reqAverage: any[] = [];
    acc.forEach((value, key) => {
      const a: any = {
        value: acc.get(key).value / acc.get(key).count,
        label: key,
      };
      reqAverage.push(a);
    });
    //console.log("calc"+daily_or_weekly+"Avg: " + JSON.stringify(reqAverage));
    return reqAverage;
  };

  //remove 0 value data points and only return hourly, daily, weekly averages
  const cleanseData = (
    sensorData: SensorData[],
    selectedTimeframe: string /*"hourly" |  "daily"| "weekly"*/,
    selectedParameter: string /*"baby_temperature" | "spo2" | "heart_rate"*/
  ) => {
    sensorData = sensorData.filter((data) => {
      switch (selectedParameter) {
        case "baby_temperature":
          return data.baby_temperature > 0;
        case "spo2":
          return data.spo2 > 0;
        case "heart_rate":
          return data.heartRate > 0;
        default:
          return data;
      }
    });

    if (selectedTimeframe === "daily") {
      /*const last7Days = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
      return sensorData.filter(
        (data) => new Date(data.timestamp).getTime() > last7Days
      );*/
      return calcReqAvg(selectedTimeframe, sensorData, selectedParameter);
    } else if (selectedTimeframe === "weekly") {
      /*const last365Days = new Date().getTime() - 365 * 24 * 60 * 60 * 1000;
      return sensorData.filter(
        (data) => new Date(data.timestamp).getTime() > last365Days
      );*/
      return calcReqAvg(selectedTimeframe, sensorData, selectedParameter);
    }

    //selectedTimeframe === "hourly"
    /*const last24Hours = new Date().getTime() - 24 * 60 * 60 * 1000;
      return sensorData.filter(
        (data) => new Date(data.timestamp).getTime() > last24Hours
      );*/
    return sensorData.map((cur: SensorData) => {
      let obj: any = getFormattedValue(cur);
      return {
        value: obj.value,
        label: obj.label,
      };
    });
  };

  // Render graph with enhancements
  const renderGraph = () => {
    if (sensorData.length === 0) {
      return;
    }
    //remove 0 value data points, formatData and only return hourly, daily, weekly averages
    const cleansedData = cleanseData(
      sensorData,
      selectedTimeframe,
      selectedParameter
    );
    // slice last 10 data points
    const chartData = cleansedData.slice(-numSlicedDataPoints); // Use last 10 data points for better visibility
    console.log(
      "renderGraph: cleansedData: sliced available data points: " +
        chartData.length
    );
    const values = chartData.map((item) => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const getYAxisConfig = () => {
      switch (selectedParameter) {
        case "baby_temperature":
          return {
            min: Math.max(28, Math.floor(minValue - 0.5)), //TODO: changed from 35 to 28
            max: Math.min(42, Math.ceil(maxValue + 0.5)),
          };
        case "spo2":
          return { min: 80, max: 100 };
        case "heart_rate":
          return {
            min: Math.max(0, Math.floor(minValue - 10)),
            max: Math.ceil(maxValue + 10),
          };
        default:
          return {
            min: Math.floor(minValue),
            max: Math.ceil(maxValue),
          };
      }
    };

    const yAxisConfig = getYAxisConfig();

    //ensure the y-axis label is not too cluttered based on numSlicedDataPoints
    const commonProps = {
      data: {
        labels: chartData
          .map((item) => item.label)
          .filter(
            (item, index) =>
              index %
                (numSlicedDataPoints > 300
                  ? 120
                  : numSlicedDataPoints > 40
                  ? 12
                  : numSlicedDataPoints > 4
                  ? 1
                  : 2) ===
              0
          ),
        datasets: [{ data: chartData.map((item) => item.value) }],
      },
      width: width - 32,
      height: 260,
      yAxisLabel: "",
      yAxisSuffix: "",
      chartConfig: {
        backgroundColor: "#F8F9FA",
        backgroundGradientFrom: "#F8F9FA",
        backgroundGradientTo: "#F8F9FA",
        decimalPlaces: selectedParameter === "baby_temperature" ? 1 : 0,
        color: (opacity = 1) => `rgba(100, 254, 167, ${opacity})`, //changed G from 227 to 254
        //changed R from 180 to 100
        labelColor: (opacity = 1) => `rgba(138, 169, 184, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#8AA9B8",
        },
        propsForBackgroundLines: {
          strokeDasharray: "", // Smooth background lines
        },
        yAxisInterval: 1,
        min: yAxisConfig.min,
        max: yAxisConfig.max,
      },
      bezier: true, // Smooth line chart
    };

    return (
      <View>
        {selectedGraph === "line" ? (
          <LineChart {...commonProps} />
        ) : (
          <BarChart {...commonProps} />
        )}
        {/* Adding X and Y axis labels */}
        <View style={styles.axisLabels}>
          <Text style={styles.yAxisLabel}>
            Value (
            {parameters.find((param) => param.key === selectedParameter)?.unit})
          </Text>
          <Text style={styles.xAxisLabel}>Time</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SensorDataFetcher setSensorData={setSensorData} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#8AA9B8" />
        </TouchableOpacity>
        <Text style={styles.title}>Baby Monitor Graphs</Text>
      </View>

      {/* Timeframe and Graph Type Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Timeframe:</Text>
          <View style={styles.buttonGroup}>
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                style={[
                  styles.button,
                  selectedTimeframe === timeframe && styles.selectedButton,
                ]}
                onPress={() => {
                  console.log("setSelectedTimeframe: " + timeframe);
                  setSelectedTimeframe(timeframe);
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedTimeframe === timeframe &&
                      styles.selectedButtonText,
                  ]}
                >
                  {timeframe}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Graph Type:</Text>
          <View style={styles.buttonGroup}>
            {graphTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.button,
                  selectedGraph === type && styles.selectedButton,
                ]}
                onPress={() => {
                  console.log("setSelectedGraph: " + type);
                  setSelectedGraph(type);
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedGraph === type && styles.selectedButtonText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Graph Rendering */}
      <View style={styles.graphContainer}>{renderGraph()}</View>

      {/* Parameter Selection */}
      <View style={styles.parameterContainer}>
        {parameters.map((param) => (
          <TouchableOpacity
            key={param.key}
            style={[
              styles.parameterButton,
              selectedParameter === param.key && styles.selectedParameterButton,
            ]}
            onPress={() => {
              console.log("setSelectedParameter: " + param.key),
                setSelectedParameter(param.key);
            }}
          >
            <Text
              style={[
                styles.parameterButtonText,
                selectedParameter === param.key &&
                  styles.selectedParameterButtonText,
              ]}
            >
              {param.label}
            </Text>
            <Text style={styles.parameterUnit}>{param.unit}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8AA9B8",
  },
  controlsContainer: {
    padding: 16,
  },
  controlGroup: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8AA9B8",
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#FDC1C5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: "#8AA9B8",
  },
  buttonText: {
    color: "#8AA9B8",
    fontWeight: "bold",
  },
  selectedButtonText: {
    color: "#FFFFFF",
  },
  graphContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  axisLabels: {
    position: "relative",
    alignItems: "center",
    marginTop: -20,
  },
  xAxisLabel: {
    fontSize: 12,
    color: "#8AA9B8",
    marginTop: 8,
  },
  yAxisLabel: {
    position: "absolute",
    left: -40,
    top: 100,
    transform: [{ rotate: "270deg" }],
    fontSize: 12,
    color: "#8AA9B8",
  },
  parameterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  parameterButton: {
    backgroundColor: "#FDC1C5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  selectedParameterButton: {
    backgroundColor: "#8AA9B8",
  },
  parameterButtonText: {
    color: "#8AA9B8",
    fontWeight: "bold",
  },
  selectedParameterButtonText: {
    color: "#FFFFFF",
  },
  parameterUnit: {
    color: "#8AA9B8",
    fontSize: 12,
  },
});

export default BabyMonitorGraphPage;
