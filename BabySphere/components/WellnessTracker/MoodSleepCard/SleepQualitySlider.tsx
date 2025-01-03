import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../../utils/theme';

interface SleepQualitySliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

export function SleepQualitySlider({ value, onValueChange }: SleepQualitySliderProps) {
  const qualityLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sleep Quality</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.buttonContainer}>
        {qualityLevels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.qualityButton,
              value === level && styles.selectedButton,
              { backgroundColor: getBackgroundColor(level) }
            ]}
            onPress={() => onValueChange(level)}
          >
            <Text style={[styles.buttonText, value === level && styles.selectedButtonText]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Poor</Text>
        <Text style={styles.labelText}>Excellent</Text>
      </View>
    </View>
  );
}

const getBackgroundColor = (level: number) => {
  const startColor = { r: 163, g: 216, b: 244 }; // #A3D8F4
  const endColor = { r: 180, g: 227, b: 167 }; // #B4E3A7

  const r = Math.round(startColor.r + (endColor.r - startColor.r) * (level - 1) / 9);
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * (level - 1) / 9);
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * (level - 1) / 9);

  return `rgb(${r}, ${g}, ${b})`;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  qualityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: theme.colors.text,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    color: theme.colors.text,
    fontSize: 14,
  },
});

