import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const categories = ['All', 'Baby Care', 'Mental Wellness', 'Physical Wellness', 'General'];

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#8AA9B8',
  },
  categoryText: {
    fontSize: 12,
    color: '#8AA9B8',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
});
