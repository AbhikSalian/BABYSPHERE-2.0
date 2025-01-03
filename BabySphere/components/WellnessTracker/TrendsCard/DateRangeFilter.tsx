import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';
import type { TimeRange } from '../../../types/wellness';

interface DateRangeFilterProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export function DateRangeFilter({ selectedRange, onRangeChange }: DateRangeFilterProps) {
  const ranges: TimeRange[] = ['week', 'month', 'custom'];

  return (
    <View style={styles.container}>
      {ranges.map((range) => (
        <TouchableOpacity
          key={range}
          style={[
            styles.button,
            selectedRange === range && styles.selectedButton,
          ]}
          onPress={() => onRangeChange(range)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedRange === range && styles.selectedButtonText,
            ]}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedButton: {
    backgroundColor: theme.colors.activeFilter,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  selectedButtonText: {
    fontWeight: '600',
  },
});
