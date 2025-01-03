import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MoodSleepCard } from './MoodSleepCard/MoodSleepCard';
import { JournalCard } from './JournalCard';
import { TrendsCard } from './TrendsCard';
import { TipsCard } from './TipsCard';
import { CardSwiper } from '../ui/CardSwiper';
import { theme } from '../../utils/theme';

export function WellnessTracker() {
  const cards = [
    { id: 'mood-sleep', component: MoodSleepCard },
    { id: 'journal', component: JournalCard },
    { id: 'trends', component: TrendsCard },
    { id: 'tips', component: TipsCard },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <CardSwiper cards={cards} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});