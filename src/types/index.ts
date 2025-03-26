/**
 * Represents a quote with its metadata
 */
export interface Quote {
  id: string;         // Unique identifier for the quote
  text: string;       // The quote content
  author: string;     // The quote author
  date: string;       // ISO string of when the quote was fetched
}

/**
 * Represents the mood analysis of a quote
 */
export type MoodAnalysis = {
  score: number;      // Raw sentiment score, typically between -1 and 1
  mood: 'positive' | 'negative' | 'neutral';  // Categorical classification
  intensity: number;  // Normalized intensity between 0-1
  words: {            // Words that contributed to the sentiment
    positive: string[];
    negative: string[];
  }
};

/**
 * Color scheme generated based on mood
 */
export interface MoodColors {
  primary: string;    // Primary background color
  secondary: string;  // Secondary gradient color
  text: string;       // Text color with appropriate contrast
}

/**
 * Quote with its associated mood analysis
 */
export interface AnalyzedQuote extends Quote {
  analysis: MoodAnalysis;
}
