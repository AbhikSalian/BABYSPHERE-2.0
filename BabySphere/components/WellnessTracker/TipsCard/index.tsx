import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../ui/Card';
import { TipsList } from './TipList';
import { TipOfTheDay } from './TipOfTheDay';
import { theme } from '../../../utils/theme';
import { CategoryFilter } from './CategoryFilter';

export function TipsCard() {
  return (
    <Card style={styles.container}>
      <Text style={styles.header}>Wellness Tips</Text>
      <Text style={styles.subheader}>Simple tips to enhance your and your baby's wellness.</Text>
      <TipOfTheDay />
      <CategoryFilter />
      <ScrollView style={styles.scrollView}>
        <TipsList />
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF1C1',
    padding: 16,
    borderRadius: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8AA9B8',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 14,
    color: '#8AA9B8',
    marginBottom: 16,
  },
  scrollView: {
    maxHeight: 400, // Adjust as needed
  },
});
