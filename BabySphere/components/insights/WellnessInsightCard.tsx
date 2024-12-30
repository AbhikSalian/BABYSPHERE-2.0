import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { theme } from '../../utils/theme';
import type { WellnessInsight } from '../../types/analytics';

interface WellnessInsightCardProps {
  insight: WellnessInsight;
}

export function WellnessInsightCard({ insight }: WellnessInsightCardProps) {
  return (
    <Card>
      <Text style={styles.title}>{insight.title}</Text>
      <Text style={styles.description}>{insight.description}</Text>
      {insight.score !== undefined && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Score:</Text>
          <Text style={styles.scoreValue}>{insight.score.toFixed(1)}</Text>
          {insight.improvement && (
            <Text style={[
              styles.improvement,
              insight.improvement > 0 ? styles.positive : styles.negative
            ]}>
              {insight.improvement > 0 ? '↑' : '↓'} {Math.abs(insight.improvement).toFixed(1)}%
            </Text>
          )}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginRight: 8,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  improvement: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  positive: {
    color: theme.colors.success,
  },
  negative: {
    color: theme.colors.error,
  },
});