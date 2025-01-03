import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { JournalEntry } from './types';
import { JournalHeader } from './JournalHeader';
import { EntryList } from './EntryList';
import { NewEntryForm } from './NewEntryForm';
import { fetchJournalEntries } from '../../services/journalService';

export function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setIsLoading(true);
      const journalEntries = await fetchJournalEntries();
      setEntries(journalEntries);
    } catch (err) {
      setError("Failed to load journal entries");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <JournalHeader />
      <ScrollView style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <>
            <EntryList entries={entries} onRefresh={loadEntries} />
            <NewEntryForm onEntryAdded={loadEntries} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A3D8F4",
  },
  content: {
    flex: 1,
  },
  loader: {
    flex: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  error: {
    color: "#FF0000",
    textAlign: "center",
    margin: 20,
  },
});

