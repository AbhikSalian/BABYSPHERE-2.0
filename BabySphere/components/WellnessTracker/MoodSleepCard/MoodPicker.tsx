import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { MoodType } from '../../../types/wellness';

const moods: { type: MoodType; icon: string; color: string }[] = [
  { type: 'happy', icon: 'smile', color: '#B4E3A7' },
  { type: 'sad', icon: 'frown', color: '#FDC1C5' },
  { type: 'neutral', icon: 'meh', color: '#F8F9FA' },
  { type: 'tired', icon: 'battery', color: '#A3D8F4' },
  { type: 'energetic', icon: 'zap', color: '#FFF1C1' },
];

interface MoodPickerProps {
  selectedMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

export function MoodPicker({ selectedMood, onMoodSelect }: MoodPickerProps) {
  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.type}
          style={[
            styles.moodButton,
            { backgroundColor: mood.color },
            selectedMood === mood.type && styles.selectedMood,
          ]}
          onPress={() => onMoodSelect(mood.type)}
        >
          <Feather
            name={mood.icon as any}
            size={32}
            color={selectedMood === mood.type ? '#FFF' : '#8AA9B8'}
          />
          <Text style={styles.moodText}>{mood.type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 10,
  },
  selectedMood: {
    borderWidth: 2,
    borderColor: '#8AA9B8',
  },
  moodText: {
    marginTop: 5,
    fontSize: 12,
    color: '#8AA9B8',
  },
});

