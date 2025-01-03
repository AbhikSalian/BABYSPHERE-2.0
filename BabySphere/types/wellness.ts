// Import types from analytics if they are defined there
import type { WellnessInsight as ImportedWellnessInsight, TrendPoint as ImportedTrendPoint } from './analytics';

// Re-export the imported types
export type WellnessInsight = ImportedWellnessInsight;
export type TrendPoint = ImportedTrendPoint;

export type MoodType = 'happy' | 'sad' | 'tired' | 'stressed';

export interface SleepData {
  quality: number;
  duration?: number;
}

export interface WellnessLog {
  id: string;
  date: string;
  mood: MoodType;
  sleep?: SleepData;
  userId: string;
}

export interface WellnessStats {
  averages: {
    mood: number;
    sleep: number;
  };
  trends: {
    mood: TrendPoint[];
    sleep: TrendPoint[];
  };
  insights: WellnessInsight[];
}

export interface WellnessPattern {
  id: string;
  type: string;
  description: string;
}

export type TimeRange = 'day' | 'week' | 'month';

