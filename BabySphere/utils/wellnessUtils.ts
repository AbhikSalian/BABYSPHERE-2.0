import type { WellnessLog, WellnessStats, TrendPoint, WellnessInsight, WellnessPattern } from '../types/wellness';
import type { DailyWellnessData } from '../types/analytics';

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

  const insights = generateInsights(logs);

  return {
    averages: {
      mood: calculateAverage(moodTrends.map(t => t.value)),
      sleep: calculateAverage(sleepTrends.map(t => t.value))
    },
    trends: {
      mood: moodTrends,
      sleep: sleepTrends
    },
    insights
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

export function generateInsights(logs: WellnessLog[]): WellnessInsight[] {
  const insights: WellnessInsight[] = [];
  
  // Calculate recent vs previous averages
  const recentLogs = logs.slice(0, 7);
  const previousLogs = logs.slice(7, 14);
  
  const recentMoodAvg = calculateAverage(recentLogs.map(log => getMoodValue(log.mood)));
  const previousMoodAvg = calculateAverage(previousLogs.map(log => getMoodValue(log.mood)));
  
  // Add mood trend insight
  insights.push({
    id: 'mood-trend',
    type: 'mood',
    title: 'Mood Trend',
    description: recentMoodAvg > previousMoodAvg 
      ? 'Your mood has improved over the past week!'
      : 'Your mood has slightly decreased recently.',
    score: recentMoodAvg,
    improvement: previousMoodAvg ? ((recentMoodAvg - previousMoodAvg) / previousMoodAvg) * 100 : 0
  });

  return insights;
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
    },
    insights: []
  };
}

export function calculateDailyMetrics(wellnessLogs: WellnessLog[], journalEntries: any[]): DailyWellnessData[] {
  // Combine wellness logs and journal entries
  const combinedData = [...wellnessLogs, ...journalEntries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate daily metrics
  const dailyMetrics: DailyWellnessData[] = combinedData.map(item => {
    const date = new Date(item.date);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    if ('mood' in item) {
      // This is a wellness log
      return {
        date: formattedDate,
        moodScore: getMoodValue(item.mood),
        sleepQuality: item.sleep?.quality || 0,
        journalEntryCount: 0
      };
    } else {
      // This is a journal entry
      return {
        date: formattedDate,
        moodScore: 3, // Neutral mood as placeholder
        sleepQuality: 0,
        journalEntryCount: 1
      };
    }
  });

  // Combine metrics for the same date
  const combinedMetrics: { [key: string]: DailyWellnessData } = {};
  dailyMetrics.forEach(metric => {
    if (combinedMetrics[metric.date]) {
      combinedMetrics[metric.date].moodScore = (combinedMetrics[metric.date].moodScore + metric.moodScore) / 2;
      combinedMetrics[metric.date].sleepQuality = Math.max(combinedMetrics[metric.date].sleepQuality, metric.sleepQuality);
      combinedMetrics[metric.date].journalEntryCount += metric.journalEntryCount;
    } else {
      combinedMetrics[metric.date] = metric;
    }
  });

  return Object.values(combinedMetrics).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

