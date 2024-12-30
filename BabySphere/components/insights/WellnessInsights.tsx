import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WellnessInsightCard } from './WellnessInsightCard';
import { useWellnessData } from '../../hooks/useWellnessData';
import { theme } from '../../utils/theme';

export function WellnessInsights() {
  const { loading, error, data } = useWellnessData();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading insights...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (data.insights.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>No insights available.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {data.insights.map((insight, index) => (
        <View key={insight.id} style={styles.cardContainer}>
          <WellnessInsightCard insight={insight} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  cardContainer: {
    width: 300,
  },
  loading: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  error: {
    color: theme.colors.error,
    textAlign: 'center',
  },
  empty: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
