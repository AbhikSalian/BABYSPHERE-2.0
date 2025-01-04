import React, { useState,useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WellnessTracker } from '../components/MoodPicker';
import { WellnessInsights } from '../components/insights/WellnessInsights';
import { useWellnessLog } from '../hooks/useWellnessLog';
import { theme } from '../utils/theme';
import  {WellnessTips}  from './tips/WellnessTips';
import { WellnessTrends } from './trends/WellnessTrends';
import { usePreferences } from '../hooks/usePreferences';
import type { MoodType } from '../types/wellness';
import { db, auth } from '../config/firebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import { getDoc, doc } from 'firebase/firestore';

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
  const isFocused = useIsFocused();

  
  useEffect(() => {
    if (isFocused) {
      // Fetch and update mood and sleep quality when the screen is focused
      // Assuming fetchMoodAndSleep is a function that fetches the latest mood and sleep quality
      fetchMoodAndSleep();
    }
  }, [isFocused]);

  const fetchMoodAndSleep = async () => {
    // Fetch the latest mood and sleep quality from Firebase
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setSelectedMood(data.parent.mood);
        setSleepQuality(data.parent.sleepQuality);
      }
    }
  };
  const handleSaveMoodAndSleep = async () => {
    if (selectedMood) {
      await saveMoodAndSleep(selectedMood, sleepQuality);
    }

    // Refresh tips after saving mood and sleep quality
    fetchMoodAndSleep();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <WellnessTracker
          onQualityChange={setSleepQuality}
          quality={sleepQuality}
          onMoodSelect={setSelectedMood}
          selectedMood={selectedMood}
          onSave={handleSaveMoodAndSleep}
          isLoading={isLoading}>
        </WellnessTracker>            
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
