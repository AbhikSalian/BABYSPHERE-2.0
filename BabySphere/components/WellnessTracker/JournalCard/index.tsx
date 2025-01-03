import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../ui/Card';
import { JournalInput } from './JournalInput';
import { JournalEntryList } from './JournalEntryList';
import { theme } from '../../../utils/theme';

export function JournalCard() {
  const [entry, setEntry] = useState('');

  return (
    <Card style={styles.container}>
      <Text style={styles.header}>Your Journal</Text>
      
      <JournalInput
        value={entry}
        onChangeText={setEntry}
      />

      <JournalEntryList />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A3D8F4',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
});