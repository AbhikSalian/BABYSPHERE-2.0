import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TipItem } from './TipItem';
import { Tip } from './types';

const tips: Tip[] = [
  { id: '1', category: 'Baby Care', content: 'Establish a consistent bedtime routine for your baby.' },
  { id: '2', category: 'Mental Wellness', content: 'Practice mindfulness for 5 minutes each day.' },
  { id: '3', category: 'Physical Wellness', content: 'Take a 10-minute walk to boost your energy.' },
  { id: '4', category: 'General', content: 'Stay hydrated by drinking at least 8 glasses of water daily.' },
];

export function TipsList() {
  return (
    <FlatList
      data={tips}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TipItem tip={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
});
