import React from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../ui/Card';
import { theme } from '../../utils/theme';
import type { InsightPreferences, InsightType } from '../../types/preferences';

interface InsightPreferencesModalProps {
  preferences: InsightPreferences;
  onPreferencesChange: (preferences: InsightPreferences) => void;
}

export function InsightPreferencesModal({ 
  preferences, 
  onPreferencesChange 
}: InsightPreferencesModalProps) {
  const insightTypes: { type: InsightType; label: string }[] = [
    { type: 'mood', label: 'Mood Insights' },
    { type: 'sleep', label: 'Sleep Analysis' },
    { type: 'journal', label: 'Journal Analysis' },
    { type: 'correlation', label: 'Correlations' },
    { type: 'pattern', label: 'Pattern Detection' },
  ];

  const toggleInsightType = (type: InsightType) => {
    const newTypes = preferences.enabledTypes.includes(type)
      ? preferences.enabledTypes.filter(t => t !== type)
      : [...preferences.enabledTypes, type];

    onPreferencesChange({
      ...preferences,
      enabledTypes: newTypes
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={styles.title}>Insight Preferences</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insight Types</Text>
          {insightTypes.map(({ type, label }) => (
            <View key={type} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Switch
                value={preferences.enabledTypes.includes(type)}
                onValueChange={() => toggleInsightType(type)}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Enable Notifications</Text>
            <Switch
              value={preferences.notificationsEnabled}
              onValueChange={(value) => onPreferencesChange({
                ...preferences,
                notificationsEnabled: value
              })}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            />
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: theme.colors.text,
  },
});