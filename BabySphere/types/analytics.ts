export type InsightType = 'mood' | 'sleep' | 'journal' | 'correlation' | 'pattern';

export interface WellnessMetrics {
  moodScore: number;
  sleepQuality: number;
  journalSentiment?: number;
}

export interface DailyWellnessData extends WellnessMetrics {
  date: string;
  journalEntryCount: number;
}

export interface WellnessAnalytics {
  overallScore: number;
  trendData: DailyWellnessData[];
  insights: WellnessInsight[];
  patterns: WellnessPattern[];
}

export interface WellnessInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  score?: number;
  improvement?: number;
}

export interface WellnessPattern {
  type: 'daily' | 'weekly' | 'correlation';
  description: string;
  confidence: number;
}

export interface TrendPoint {
  date: string;
  value: number;
}