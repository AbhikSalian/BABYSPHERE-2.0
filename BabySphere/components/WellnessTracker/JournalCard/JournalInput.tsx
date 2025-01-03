import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

interface JournalInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function JournalInput({ value, onChangeText, placeholder = "Write your thoughts..." }: JournalInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 16,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: theme.colors.text,
    minHeight: 120,
  },
});