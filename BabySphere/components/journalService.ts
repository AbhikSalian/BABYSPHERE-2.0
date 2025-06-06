import { db } from '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig'; // Import the auth instance
import { collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import type { JournalEntry } from '../types/journal';

export const journalService = {
  async saveEntry(content: string, tags: string[]) {
    try {
      const userId = auth.currentUser?.uid; // Get the current user's ID
      if (!userId) {
        throw new Error('User is not authenticated.');
      }

      const entry: Omit<JournalEntry, 'id'> = {
        content,
        tags,
        date: new Date().toISOString(),
        userId, // Use the authenticated user's ID
      };

      const docRef = await addDoc(collection(db, 'journalEntries'), entry);
      return docRef.id;
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw error;
    }
  },

  async getRecentEntries(limitCount = 10) {
    try {
      const userId = auth.currentUser?.uid; // Get the current user's ID
      if (!userId) {
        throw new Error('User is not authenticated.');
      }

      const q = query(
        collection(db, 'journalEntries'),
        where('userId', '==', userId), // Filter by the authenticated user's ID
        orderBy('date', 'desc'),
        limit(limitCount) // Correct usage of limit
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JournalEntry[];
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw error;
    }
  },
};
