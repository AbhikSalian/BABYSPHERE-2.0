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
}

export interface TrendPoint {
  date: string;
  value: number;
}

export type TimeRange = 'day' | 'week' | 'month';