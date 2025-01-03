import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Tip } from './types';

const categoryColors: { [key: string]: string } = {
  'Baby Care': '#A3D8F4',
  'Mental Wellness': '#FDC1C5',
  'Physical Wellness': '#B4E3A7',
  'General': '#F8F9FA',
};

interface TipItemProps {
  tip: Tip;
}

export function TipItem({ tip }: TipItemProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.05, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: categoryColors[tip.category], transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity onPress={handlePress} style={styles.content}>
        <View style={styles.iconContainer}>
          <Feather name={tip.category === 'Baby Care' ? 'heart' : 'sun'} size={24} color="#8AA9B8" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.category}>{tip.category}</Text>
          <Text style={styles.tipContent}>{tip.content}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)} style={styles.bookmarkContainer}>
          <Feather name={isBookmarked ? 'bookmark' : 'bookmark'} size={24} color="#8AA9B8" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8AA9B8',
    marginBottom: 4,
  },
  tipContent: {
    fontSize: 14,
    color: '#8AA9B8',
  },
  bookmarkContainer: {
    marginLeft: 12,
  },
});

