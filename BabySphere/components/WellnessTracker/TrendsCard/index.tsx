import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../../ui/Card';
import { TrendChart } from './TrendChart';
import { DateRangeFilter } from './DateRangeFilter';
import { QuickInsights } from './QuickInsight';
import { theme } from '../../../utils/theme';
import type { TimeRange } from '../../../types/wellness';

export function TrendsCard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  return (
    <Card style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Trends</Text>
        <Text style={styles.subheader}>View your weekly or monthly wellness patterns</Text>
      </View>
      
      <QuickInsights />
      
      <DateRangeFilter
        selectedRange={timeRange}
        onRangeChange={setTimeRange}
      />

      <TrendChart timeRange={timeRange} />

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>View Full Analysis</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    marginBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  actionButton: {
    backgroundColor: theme.colors.actionButton,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  actionButtonText: {
    color: theme.colors.text,
    fontWeight: '600',
  },
});
