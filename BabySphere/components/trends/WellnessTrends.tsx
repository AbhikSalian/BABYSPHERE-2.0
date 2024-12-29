import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { FilterButtons } from './FilterButtons';
import { LineChart } from '../charts/LineChart';
import { useWellnessData } from '../../hooks/useWellnessData';
import { theme } from '../../utils/theme';
import type { TimeRange } from '../../types/wellness';

const TIME_RANGE_DAYS: Record<TimeRange, number> = {
  day: 1,
  week: 7,
  month: 30
};

export function WellnessTrends() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const { loading, error, data } = useWellnessData(TIME_RANGE_DAYS[timeRange]);

  if (loading) {
    return (
      <Card>
        <Text style={styles.title}>Loading trends...</Text>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Text style={styles.title}>Error loading trends</Text>
        <Text style={styles.error}>{error}</Text>
      </Card>
    );
  }

  const transformTrendData = (trendPoints: { date: string; value: number }[]) => {
    return trendPoints.map(point => ({
      x: new Date(point.date),
      y: point.value
    }));
  };

  return (
    <Card>
      <Text style={styles.title}>Wellness Trends</Text>
      <FilterButtons
        selectedRange={timeRange}
        onRangeChange={setTimeRange}
      />
      
      <View style={styles.chartContainer}>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
            <Text style={styles.legendText}>Mood</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.colors.secondary }]} />
            <Text style={styles.legendText}>Sleep</Text>
          </View>
        </View>

        <LineChart
          data={transformTrendData(data.trends.mood)}
          color={theme.colors.primary}
        />
        <LineChart
          data={transformTrendData(data.trends.sleep)}
          color={theme.colors.secondary}
        />
      </View>

      <Text style={styles.description}>
        Track your daily mood and sleep patterns over time
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  error: {
    color: theme.colors.error,
    fontSize: 14,
  },
  chartContainer: {
    marginTop: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  description: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});