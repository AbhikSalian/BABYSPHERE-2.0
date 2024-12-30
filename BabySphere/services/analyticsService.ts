import { db } from '../config/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { calculateOverallMoodScore, findPatterns } from '../utils/analyticsUtils';
import { calculateDailyMetrics, generateInsights } from '../utils/wellnessUtils';
import type { WellnessAnalytics, DailyWellnessData } from '../types/analytics';
import type { WellnessLog } from '../types/wellness';

export const analyticsService = {
  async getWellnessAnalytics(userId: string, days: number = 30): Promise<WellnessAnalytics> {
    try {
      // Fetch mood and sleep data
      const wellnessQuery = query(
        collection(db, 'wellnessLogs'),
        where('userId', '==', userId),
        where('date', '>=', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()),
        orderBy('date', 'desc')
      );

      // Fetch journal entries with sentiment scores
      const journalQuery = query(
        collection(db, 'journalEntries'),
        where('userId', '==', userId),
        where('date', '>=', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()),
        orderBy('date', 'desc')
      );

      const [wellnessSnapshot, journalSnapshot] = await Promise.all([
        getDocs(wellnessQuery),
        getDocs(journalQuery)
      ]);

      // Process the data
      const wellnessLogs: WellnessLog[] = wellnessSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as WellnessLog));

      const journalEntries = journalSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));

      // Calculate daily metrics
      const dailyData = calculateDailyMetrics(wellnessLogs, journalEntries);
      
      // Calculate overall score and find patterns
      const overallScore = calculateOverallMoodScore(dailyData);
      const patterns = findPatterns(dailyData);

      // Generate insights
      const insights = generateInsights(wellnessLogs);

      return {
        overallScore,
        trendData: dailyData,
        insights,
        patterns
      };
    } catch (error) {
      console.error('Error fetching wellness analytics:', error);
      throw new Error('Failed to fetch wellness analytics');
    }
  }
};

