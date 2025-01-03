import { db, auth } from "../config/firebaseConfig";
import { 
  collection, 
  query, 
  orderBy, 
  getDocs,where,
  addDoc,
  serverTimestamp 
} from "firebase/firestore";
import { JournalEntry } from "../components/journal/types";

export async function fetchJournalEntries(): Promise<JournalEntry[]> {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const entriesRef = collection(db, "journalEntries");
  const q = query(
    entriesRef,
    where("userId", "==", auth.currentUser.uid), 
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as JournalEntry[];
}

export async function addJournalEntry(entry: Omit<JournalEntry, "id">) {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const entriesRef = collection(db, "journalEntries");
  await addDoc(entriesRef, {
    ...entry,
    userId: auth.currentUser.uid,
    date: serverTimestamp(),
  });
}