import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { CircleProgress } from '../ui/CircleProgress';
import { theme } from '../../utils/theme';
import { getMoodEmoji } from '../../utils/moodUtils';
import { formatTime } from '../../utils/dateUtils';
import type { WellnessStats } from '../../types/wellness';

interface StatsBarProps {
  data?: WellnessStats;
  lastJournalEntry?: string;
  isLoading: boolean;
}

export function StatsBar({ data, lastJournalEntry, isLoading }: StatsBarProps) {
  if (isLoading) {
    return <View style={styles.skeleton} />;
  }

  const moodEmoji = getMoodEmoji(data?.averages.mood || 0);
  const sleepScore = Math.round(data?.averages.sleep || 0);
  const journalTime = lastJournalEntry ? formatTime(new Date(lastJournalEntry)) : 'No entries';

  return (
    <Animated.View 
      entering={FadeIn}
      style={styles.container}
    >
      <View style={styles.stat}>
        <Text style={styles.label}>Mood</Text>
        <Text style={styles.emoji}>{moodEmoji}</Text>
        <Text style={styles.value}>7-day avg</Text>
      </View>

      <View style={styles.stat}>
        <Text style={styles.label}>Sleep</Text>
        <CircleProgress 
          progress={sleepScore / 10}
          size={48}
          strokeWidth={4}
        />
        <Text style={styles.value}>{sleepScore}/10</Text>
      </View>

      <View style={styles.stat}>
        <Text style={styles.label}>Last Journal</Text>
        <Text style={styles.value}>{journalTime}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  skeleton: {
    height: 80,
    backgroundColor: theme.colors.border,
  },
});