import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Platform } from 'react-native';
import VideoPlayer from './VideoPlayer';
import LiveParameters from './LiveParameters';
import SensorDataFetcher from './SensorDataFetcher';
import { SensorData } from '../types/SensorData';
import { WebView } from 'react-native-webview';

const LiveFeed: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const latestData = sensorData.length > 0 ? sensorData[sensorData.length - 1] : null;

  const cameraFeedUri = "http://192.168.40.162:5002/processed_feed"; // Replace with your live stream URL

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

      {/* Live Stream Component */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#8AA9B8" />
      ) : error ? (
        <Text style={styles.errorText}>Error loading live stream: {error}</Text>
      ) : Platform.OS === 'web' ? (
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
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              setError(`Failed to load live stream: ${nativeEvent.description}`);
            }}
          />
        </View>
      )}

      <LiveParameters latestData={latestData} />
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
    textAlign: 'center',
  },
  iframe: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    
  },
  webViewContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  webView: {
    flex: 1,
  },
});

export default LiveFeed;
