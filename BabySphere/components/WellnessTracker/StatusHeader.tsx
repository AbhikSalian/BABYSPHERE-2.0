import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/dateUtils';
import { theme } from '../../utils/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

export function StatusHeader() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const currentDate = formatDate(new Date());

  return (
    <Animated.View 
      entering={FadeIn}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.content}>
        <Text style={styles.greeting}>
          Hi, {user?.displayName || 'there'}!
        </Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  content: {
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
});