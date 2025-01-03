import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../../ui/Card';
import { MoodPicker } from './MoodPicker';
import { SleepQualitySlider } from './SleepQualitySlider';
import { SaveButton } from '../../ui/SaveButton';
import { theme } from '../../../utils/theme';
import type { MoodType } from '../../../types/wellness';
import Toast from 'react-native-toast-message';
import { Feather } from '@expo/vector-icons';

export function MoodSleepCard() {
  const [mood, setMood] = useState<MoodType>();
  const [sleepQuality, setSleepQuality] = useState(5);

  const handleSave = () => {
    // TODO: Implement save functionality
    Toast.show({
      type: 'success',
      text1: 'Entry Saved',
      text2: 'Your mood and sleep quality have been recorded.',
    });
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.header}>Log Your Mood & Sleep</Text>
      <Text style={styles.subheader}>Track your daily wellness and improve habits.</Text>
      
      <MoodPicker
        selectedMood={mood}
        onMoodSelect={setMood}
      />

      <SleepQualitySlider
        value={sleepQuality}
        onValueChange={(value) => setSleepQuality(value)}
      />

      <SaveButton
        onPress={handleSave}
        disabled={!mood}
        label="Save Entry"
      />

      <TouchableOpacity style={styles.reminderButton}>
        <Feather name="bell" size={24} color={theme.colors.text} />
        <Text style={styles.reminderText}>Set Daily Reminder</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyButton}>
        <Feather name="calendar" size={24} color={theme.colors.text} />
        <Text style={styles.historyText}>View Past Entries</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3DFFD',
    padding: 20,
    borderRadius: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8AA9B8',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: '#8AA9B8',
    marginBottom: 20,
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  reminderText: {
    marginLeft: 10,
    color: '#8AA9B8',
    fontSize: 16,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  historyText: {
    marginLeft: 10,
    color: '#8AA9B8',
    fontSize: 16,
  },
});

