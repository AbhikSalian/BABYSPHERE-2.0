import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function JournalHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.icon}>📝</Text>
      <Text style={styles.title}>Your Journal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#A3D8F4',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
});

