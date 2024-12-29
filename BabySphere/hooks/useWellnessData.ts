import { useState, useEffect } from 'react';
import { wellnessService } from '../services/wellnessService';
import type { WellnessStats } from '../types/wellness';

export function useWellnessData(days: number = 7) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WellnessStats>({
    averages: { mood: 0, sleep: 0 },
    trends: { mood: [], sleep: [] }
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const wellnessData = await wellnessService.getWellnessData(days);
        if (mounted) {
          setData(wellnessData);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch wellness data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [days]);

  return {
    loading,
    error,
    data
  };
}