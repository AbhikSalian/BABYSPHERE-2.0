import type { TrendPoint } from '../types/analytics';
import type { DataPoint } from '../types/charts';

interface TrendData {
  mood: TrendPoint[];
  sleep: TrendPoint[];
}

export function formatTrendData(data: TrendData): { mood: DataPoint[], sleep: DataPoint[] } {
  return {
    mood: convertToDataPoints(ensureValidPoints(data.mood)),
    sleep: convertToDataPoints(ensureValidPoints(data.sleep))
  };
}

function ensureValidPoints(points: TrendPoint[]): TrendPoint[] {
  return points.map(point => ({
    date: point.date,
    // Ensure value is a valid number between 0 and 10
    value: Math.min(10, Math.max(0, Number(point.value) || 0))
  }));
}

function convertToDataPoints(points: TrendPoint[]): DataPoint[] {
  return points.map(point => ({
    x: new Date(point.date),
    y: point.value
  }));
}