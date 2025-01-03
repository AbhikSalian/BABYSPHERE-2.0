import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import VideoPlayer from './VideoPlayer';
import LiveParameters from './LiveParameters';
import SensorDataFetcher from './SensorDataFetcher';
import { SensorData } from '../types/SensorData';

const LiveFeed: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const latestData = sensorData.length > 0 ? sensorData[sensorData.length - 1] : null;

<<<<<<< HEAD
  const cameraFeedUri = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
=======
  const cameraFeedUri = "http://192.168.40.162:5002/processed_feed"; // Replace with your live stream URL
>>>>>>> 3e036ded72285d2b231dce8fb1bfcf81ee702410

  return (
    <SafeAreaView style={styles.container}>
      <SensorDataFetcher 
        setSensorData={setSensorData}
        selectedDate={selectedDate}
        setIsLoading={setIsLoading}
        setError={setError}
      />
      <View style={styles.header}>
        <View style={styles.liveIndicator}>
          <Text style={styles.liveText}>Live</Text>
          <View style={styles.redDot} />
        </View>
      </View>
<<<<<<< HEAD
      <VideoPlayer uri={cameraFeedUri} />
=======

      {/* Live Stream Component */}
      {Platform.OS === 'web' ? (
        <iframe 
          src={cameraFeedUri} 
          style={styles.iframe} 
          title="Live Stream" 
        />
      ) : (
        <View style={styles.webViewContainer}>
          <WebView 
            source={{ uri: cameraFeedUri }} 
            style={styles.webView} 
            onError={() => setError("")}
          />
        </View>
      )}

>>>>>>> 3e036ded72285d2b231dce8fb1bfcf81ee702410
      <LiveParameters latestData={latestData} />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveText: {
    color: '#8AA9B8',
    fontWeight: 'bold',
    marginRight: 5,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FDC1C5',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

<<<<<<< HEAD
export default LiveFeed;

=======
export default LiveFeed;
>>>>>>> 3e036ded72285d2b231dce8fb1bfcf81ee702410
