import type { WellnessLog, WellnessStats, TrendPoint } from '../types/wellness';

export function processWellnessData(logs: WellnessLog[]): WellnessStats {
  if (!logs.length) {
    return createEmptyStats();
  }

  const moodTrends = logs.map(log => ({
    date: log.date,
    value: getMoodValue(log.mood)
  }));

  const sleepTrends = logs.map(log => ({
    date: log.date,
    value: log.sleep?.quality || 0
  }));

  return {
    averages: {
      mood: calculateAverage(moodTrends.map(t => t.value)),
      sleep: calculateAverage(sleepTrends.map(t => t.value))
    },
    trends: {
      mood: moodTrends,
      sleep: sleepTrends
    }
  };
}

function getMoodValue(mood: string): number {
  const moodValues: Record<string, number> = {
    happy: 5,
    content: 4,
    neutral: 3,
    sad: 2,
    stressed: 1,
  };
  return moodValues[mood] || 3;
}

function calculateAverage(numbers: number[]): number {
  if (!numbers.length) return 0;
  return Math.round((numbers.reduce((a, b) => a + b, 0) / numbers.length) * 10) / 10;
}

function createEmptyStats(): WellnessStats {
  return {
    averages: {
      mood: 0,
      sleep: 0
    },
    trends: {
      mood: [],
      sleep: []
    }
  };
}