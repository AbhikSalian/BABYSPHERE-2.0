import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';
import { formatDate } from '../../../utils/dateUtils';

interface JournalEntryProps {
  content: string;
  date: string;
  tags?: string[];
}

export function JournalEntry({ content, date, tags }: JournalEntryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(new Date(date))}</Text>
      <Text style={styles.content}>{content}</Text>
      {tags && tags.length > 0 && (
        <View style={styles.tagContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: '#8AA9B8',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  tag: {
    backgroundColor: '#A3D8F4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.text,
  },
});