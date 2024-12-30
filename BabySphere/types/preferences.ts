export interface InsightPreferences {
    enabledTypes: InsightType[];
    timeRange: TimeRange;
    notificationsEnabled: boolean;
    minimumConfidence: number;
  }
  
  export type InsightType = 'mood' | 'sleep' | 'journal' | 'correlation' | 'pattern';
  export type TimeRange = 'week' | 'month' | 'quarter';
  
  export interface ChartPreferences {
    showLegend: boolean;
    showGridLines: boolean;
    showDataLabels: boolean;
    chartType: 'line' | 'bar' | 'scatter';
  }