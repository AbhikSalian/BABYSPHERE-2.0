import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export function QuickInsights() {
  return (
    <View style={styles.container}>
      <View style={styles.insightBubble}>
        <Text style={styles.insightText}>😊 You've been more energetic this week!</Text>
      </View>
      <View style={styles.insightBubble}>
        <Text style={styles.insightText}>💤 Your sleep improved by 15% this month</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  insightBubble: {
    backgroundColor: theme.colors.insightBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  insightText: {
    color: theme.colors.text,
    fontSize: 14,
  },
});
