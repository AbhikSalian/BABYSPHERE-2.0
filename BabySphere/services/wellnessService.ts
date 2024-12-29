import { db } from '../config/firebaseConfig';
import { collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import type { WellnessLog, MoodType, WellnessStats } from '../types/wellness';
import { processWellnessData } from '../utils/wellnessUtils';

export const wellnessService = {
  async saveMoodLog(mood: MoodType, sleepQuality: number) {
    try {
      const log: Omit<WellnessLog, 'id'> = {
        date: new Date().toISOString(),
        mood,
        sleep: {
          quality: sleepQuality,
        },
        userId: 'current-user', // TODO: Replace with actual auth user ID
      };
      
      const docRef = await addDoc(collection(db, 'wellnessLogs'), log);
      return docRef.id;
    } catch (error) {
      console.error('Error saving mood log:', error);
      throw new Error('Failed to save mood data');
    }
  },

  async getWellnessData(days: number = 7): Promise<WellnessStats> {
    try {
      const dateLimit = new Date();
      dateLimit.setDate(dateLimit.getDate() - days);

      const q = query(
        collection(db, 'wellnessLogs'),
        where('userId', '==', 'current-user'),
        where('date', '>=', dateLimit.toISOString()),
        orderBy('date', 'desc'),
        limit(days)
      );

      const querySnapshot = await getDocs(q);
      const logs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WellnessLog[];

      return processWellnessData(logs);
    } catch (error) {
      console.error('Error fetching wellness data:', error);
      throw new Error('Failed to fetch wellness data');
    }
  }
};