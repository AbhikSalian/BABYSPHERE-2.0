import type { DailyWellnessData, WellnessPattern } from '../types/analytics';

const MOOD_WEIGHT = 0.7;
const SENTIMENT_WEIGHT = 0.3;

export function calculateOverallMoodScore(dailyData: DailyWellnessData[]): number {
  return dailyData.reduce((sum, day) => {
    const moodComponent = day.moodScore * MOOD_WEIGHT;
    const sentimentComponent = day.journalSentiment 
      ? day.journalSentiment * SENTIMENT_WEIGHT 
      : 0;
    
    return sum + moodComponent + sentimentComponent;
  }, 0) / dailyData.length;
}

export function findPatterns(dailyData: DailyWellnessData[]): WellnessPattern[] {
  const patterns: WellnessPattern[] = [];

  // Find day of week patterns
  const dayAverages = calculateDayOfWeekAverages(dailyData);
  const bestDay = findBestDay(dayAverages);
  if (bestDay) {
    patterns.push({
      type: 'weekly',
      description: `Your mood tends to be best on ${bestDay.day}s`,
      confidence: bestDay.confidence
    });
  }

  // Find sleep-mood correlations
  const sleepMoodCorrelation = calculateSleepMoodCorrelation(dailyData);
  if (Math.abs(sleepMoodCorrelation) > 0.5) {
    patterns.push({
      type: 'correlation',
      description: sleepMoodCorrelation > 0 
        ? 'Better sleep quality appears to improve your mood'
        : 'Your sleep quality might be affected by your mood',
      confidence: Math.abs(sleepMoodCorrelation)
    });
  }

  return patterns;
}

function calculateDayOfWeekAverages(dailyData: DailyWellnessData[]) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayAverages = new Map();

  dailyData.forEach(day => {
    const dayOfWeek = new Date(day.date).getDay();
    const dayName = days[dayOfWeek];
    
    if (!dayAverages.has(dayName)) {
      dayAverages.set(dayName, { total: 0, count: 0 });
    }
    
    const stats = dayAverages.get(dayName);
    stats.total += day.moodScore;
    stats.count++;
  });

  return new Map(
    Array.from(dayAverages.entries()).map(([day, stats]) => [
      day,
      stats.total / stats.count
    ])
  );
}

function findBestDay(dayAverages: Map<string, number>) {
  let bestDay = null;
  let bestScore = -1;
  let totalScore = 0;
  let count = 0;

  dayAverages.forEach((score, day) => {
    if (score > bestScore) {
      bestScore = score;
      bestDay = day;
    }
    totalScore += score;
    count++;
  });

  if (!bestDay) return null;

  const averageScore = totalScore / count;
  const confidence = (bestScore - averageScore) / averageScore;

  return {
    day: bestDay,
    confidence: Math.min(confidence, 1)
  };
}

function calculateSleepMoodCorrelation(dailyData: DailyWellnessData[]): number {
  // Simple correlation coefficient calculation
  const n = dailyData.length;
  if (n < 2) return 0;

  const sumX = dailyData.reduce((sum, day) => sum + day.sleepQuality, 0);
  const sumY = dailyData.reduce((sum, day) => sum + day.moodScore, 0);
  const sumXY = dailyData.reduce((sum, day) => sum + day.sleepQuality * day.moodScore, 0);
  const sumX2 = dailyData.reduce((sum, day) => sum + day.sleepQuality * day.sleepQuality, 0);
  const sumY2 = dailyData.reduce((sum, day) => sum + day.moodScore * day.moodScore, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  return denominator === 0 ? 0 : numerator / denominator;
}