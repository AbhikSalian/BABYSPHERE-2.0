import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { theme } from '../../utils/theme';
import type { DailyWellnessData } from '../../types/analytics';
import type { ChartPreferences } from '../../types/preferences';

interface TrendChartProps {
  data: DailyWellnessData[];
  preferences: ChartPreferences;
}

export function TrendChart({ data, preferences }: TrendChartProps) {
  const chartConfig = {
    backgroundColor: theme.colors.card,
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
    labelColor: (opacity = 1) => theme.colors.textSecondary,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.colors.primary
    },
    propsForGrid: preferences.showGridLines ? {
      stroke: theme.colors.border,
      strokeWidth: 1
    } : undefined
  };

  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })),
    datasets: [
      {
        data: data.map(d => d.moodScore),
        color: (opacity = 1) => theme.colors.primary,
        strokeWidth: 2
      },
      {
        data: data.map(d => d.sleepQuality),
        color: (opacity = 1) => theme.colors.secondary,
        strokeWidth: 2
      }
    ],
    legend: preferences.showLegend ? ['Mood', 'Sleep'] : undefined
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withDots={preferences.showDataLabels}
        withInnerLines={preferences.showGridLines}
        withOuterLines={preferences.showGridLines}
        withVerticalLabels={true}
        withHorizontalLabels={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: theme.colors.card,
    borderRadius: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});