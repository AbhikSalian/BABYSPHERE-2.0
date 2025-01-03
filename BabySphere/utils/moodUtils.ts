export function getMoodEmoji(score: number): string {
    if (score >= 8) return '😊';
    if (score >= 6) return '🙂';
    if (score >= 4) return '😐';
    if (score >= 2) return '😕';
    return '😢';
  }
  
  export function getMoodColor(score: number): string {
    if (score >= 8) return '#6FCF97';
    if (score >= 6) return '#82C4FF';
    if (score >= 4) return '#FFD074';
    if (score >= 2) return '#FFB5BA';
    return '#FF8A93';
  }