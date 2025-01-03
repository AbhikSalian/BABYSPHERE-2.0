import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { JournalEntry } from './types';
import { formatDateTime } from '../../utils/dateUtils';

interface EntryListProps {
  entries: JournalEntry[];
  onRefresh: () => void;
}

export function EntryList({ entries, onRefresh }: EntryListProps) {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

  const getPreviewText = (text: string | undefined) => {
    if (typeof text === 'string') {
      return text.slice(0, 100) + (text.length > 100 ? "..." : "");
    }
    return "No content";
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {entries.map((entry) => (
        <View key={entry.id} style={styles.card}>
          <View>
            <Text style={styles.date}>{formatDateTime(entry.date)}</Text>
            <Text style={styles.preview}>{getPreviewText(entry.text)}</Text>
          </View>
          
          <ScrollView horizontal style={styles.tagsContainer}>
            {entry.tags && entry.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>{tag}</Text>
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    margin: 8,
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  date: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  preview: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  tagsContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#B4E3A7',
    color: '#333333',
    padding: 5,
    borderRadius: 15,
    fontSize: 12,
    marginRight: 5,
    overflow: 'hidden',
  },
  viewButton: {
    backgroundColor: '#FFF1C1',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  viewButtonText: {
    color: '#333333',
    fontSize: 14,
  },
});

