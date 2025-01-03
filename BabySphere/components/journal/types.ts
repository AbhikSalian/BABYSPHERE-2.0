export interface JournalEntry {
    id: string;
    text: string;
    date: Date|string;
    tags: string[];
    photoUrl?: string;
  }