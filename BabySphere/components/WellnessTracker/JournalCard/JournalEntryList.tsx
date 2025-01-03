import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { JournalEntry } from './JournalEntry';
import { useJournalEntries } from '../../../hooks/useJournalEntries';

export function JournalEntryList() {
  const { entries, loading } = useJournalEntries();

  if (loading) {
    return <View style={styles.container} />;
  }

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <JournalEntry
          content={item.content}
          date={item.date}
          tags={item.tags}
        />
      )}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});