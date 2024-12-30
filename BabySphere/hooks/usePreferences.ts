import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { InsightPreferences, ChartPreferences } from '../types/preferences';

const DEFAULT_INSIGHT_PREFERENCES: InsightPreferences = {
  enabledTypes: ['mood', 'sleep', 'correlation'],
  timeRange: 'week',
  notificationsEnabled: true,
  minimumConfidence: 0.7,
};

const DEFAULT_CHART_PREFERENCES: ChartPreferences = {
  showLegend: true,
  showGridLines: true,
  showDataLabels: true,
  chartType: 'line',
};

export function usePreferences() {
  const [insightPreferences, setInsightPreferences] = useState<InsightPreferences>(
    DEFAULT_INSIGHT_PREFERENCES
  );
  const [chartPreferences, setChartPreferences] = useState<ChartPreferences>(
    DEFAULT_CHART_PREFERENCES
  );

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const [insightPrefs, chartPrefs] = await Promise.all([
        AsyncStorage.getItem('insightPreferences'),
        AsyncStorage.getItem('chartPreferences')
      ]);

      if (insightPrefs) {
        setInsightPreferences(JSON.parse(insightPrefs));
      }
      if (chartPrefs) {
        setChartPreferences(JSON.parse(chartPrefs));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const saveInsightPreferences = async (prefs: InsightPreferences) => {
    try {
      await AsyncStorage.setItem('insightPreferences', JSON.stringify(prefs));
      setInsightPreferences(prefs);
    } catch (error) {
      console.error('Error saving insight preferences:', error);
    }
  };

  const saveChartPreferences = async (prefs: ChartPreferences) => {
    try {
      await AsyncStorage.setItem('chartPreferences', JSON.stringify(prefs));
      setChartPreferences(prefs);
    } catch (error) {
      console.error('Error saving chart preferences:', error);
    }
  };

  return {
    insightPreferences,
    chartPreferences,
    saveInsightPreferences,
    saveChartPreferences,
  };
}