import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomSlider } from './ui/CustomSlider';
import { theme } from '../utils/theme';
import type { MoodType } from '../types/wellness';

interface SleepQualityProps {
  onQualityChange: (quality: number) => void;
  quality: number;
}

interface MoodPickerProps {
  onMoodSelect: (mood: MoodType) => void;
  selectedMood?: MoodType;
  onSave: () => void;
  isLoading: boolean;
}

interface WellnessTrackerProps extends SleepQualityProps, MoodPickerProps {}

export function WellnessTracker({
  onQualityChange,
  quality,
  onMoodSelect,
  selectedMood,
  onSave,
  isLoading,
}: WellnessTrackerProps) {
  const getQualityLabel = (value: number): string => {
    if (value <= 2) return 'Poor';
    if (value <= 5) return 'Average';
    if (value <= 8) return 'Good';
    return 'Excellent';
  };

  const handleQualityChange = (newQuality: number) => {
    onQualityChange(Math.round(newQuality));
  };

  const moods: { type: MoodType; emoji: string; label: string }[] = [
    { type: 'happy', emoji: '😊', label: 'Happy' },
    { type: 'sad', emoji: '😔', label: 'Sad' },
    { type: 'tired', emoji: '😫', label: 'Tired' },
    { type: 'stressed', emoji: '😫', label: 'Stressed' },
  ];

  return (
    <View style={styles.container}>
      {/* Sleep Quality Section */}
      <View style={styles.section}>
        <Text style={styles.title}>How was your sleep last night?</Text>
        <Text style={styles.qualityLabel}>{getQualityLabel(quality)}</Text>
        <CustomSlider
          value={quality}
          minimumValue={1}
          maximumValue={10}
          onValueChange={handleQualityChange}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.border}
          showLabels={false}
          style={styles.slider}
        />
      </View>

      {/* Mood Picker Section */}
      <View style={styles.section}>
        <Text style={styles.title}>How are you feeling?</Text>
        <View style={styles.moodGrid}>
          {moods.map(({ type, emoji, label }) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.moodButton,
                selectedMood === type && styles.selectedMood,
              ]}
              onPress={() => onMoodSelect(type)}
            >
              <Text style={styles.emoji}>{emoji}</Text>
              <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!selectedMood || isLoading) && styles.saveButtonDisabled,
          ]}
          onPress={onSave}
          disabled={!selectedMood || isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Saving...' : 'Save Mood'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  qualityLabel: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: 16,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  moodButton: {
    flex: 1,
    minWidth: '45%',
    aspectRatio: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMood: {
    backgroundColor: theme.colors.primary,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: theme.colors.text,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
