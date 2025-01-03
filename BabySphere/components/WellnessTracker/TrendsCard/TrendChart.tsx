import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';
import type { TimeRange } from '../../../types/wellness';

interface TrendChartProps {
  timeRange: TimeRange;
}

export function TrendChart({ timeRange }: TrendChartProps) {
  // This is a placeholder. You should implement an actual chart here.
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>
        Chart for {timeRange} trends goes here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.chartBackground,
    borderRadius: 8,
    padding: 16,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: theme.colors.text,
    fontSize: 16,
  },
});
