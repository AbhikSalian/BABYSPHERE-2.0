import { useState } from 'react';
import { wellnessService } from '../services/wellnessService';
import type { MoodType } from '../types/wellness';

export function useWellnessLog() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveMoodAndSleep = async (mood: MoodType, sleepQuality: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await wellnessService.saveMoodLog(mood, sleepQuality);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    saveMoodAndSleep
  };
}