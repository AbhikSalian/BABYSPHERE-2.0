import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import type { JournalEntry } from '../types/journal';

export function useJournalEntries(limitCount: number = 10) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const journalRef = collection(db, 'journalEntries');
    const q = query(
      journalRef,
      orderBy('date', 'desc'),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const journalEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JournalEntry[];
      
      setEntries(journalEntries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [limitCount]);

  return { entries, loading };
}