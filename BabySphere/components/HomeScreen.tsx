import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodPicker } from '../components/MoodPicker';
import { SleepQuality } from '../components/SleepQuality';
import { WellnessInsights } from '../components/insights/WellnessInsights';
import { useWellnessLog } from '../hooks/useWellnessLog';
import { theme } from '../utils/theme';

import { WellnessTips } from './tips/WellnessTips';
import { WellnessTrends } from './trends/WellnessTrends';


import { usePreferences } from '../hooks/usePreferences';
import type { MoodType } from '../types/wellness';

export default function IntegratedWellnessScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodType>();
  const [sleepQuality, setSleepQuality] = useState(5);
  const { saveMoodAndSleep, isLoading } = useWellnessLog();
  const {
    insightPreferences,
    chartPreferences,
    saveInsightPreferences,
    saveChartPreferences,
  } = usePreferences();

  const handleSave = async () => {
    if (selectedMood) {
      await saveMoodAndSleep(selectedMood, sleepQuality);
      // Reset form after successful save
      setSelectedMood(undefined);
      setSleepQuality(5);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <MoodPicker
          onMoodSelect={setSelectedMood}
          selectedMood={selectedMood}
          onSave={handleSave}
          isLoading={isLoading}
        />
        <SleepQuality
          onQualityChange={setSleepQuality}
          quality={sleepQuality}
        />
        
        <WellnessTrends />
        <WellnessTips />
        <WellnessInsights />
       
    
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
});
