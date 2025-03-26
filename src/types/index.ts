/**
 * Represents a quote with its metadata
 */
export interface Quote {
  _id: string;         // Unique identifier for the quote
  content: string;     // The quote content
  author: string;      // The quote author
}

/**
 * Represents the mood analysis of a quote
 */
export interface MoodAnalysis {
  score: number;       // Raw sentiment score
  comparative: number; // Comparative sentiment score
  positive: string[];  // Words that contributed positively to the sentiment
  negative: string[];  // Words that contributed negatively to the sentiment
  
  // Additional properties used by the application
  mood?: 'positive' | 'negative' | 'neutral';  // The categorized mood
  intensity?: number;                         // Intensity of the mood (0-1)
  words?: {                                   // Key words that influenced the sentiment
    positive: string[];
    negative: string[];
  };
}

/**
 * Quote with its associated mood analysis
 */
export interface AnalyzedQuote {
  quote: Quote;
  analysis: MoodAnalysis;
  id?: string;         // Added for compatibility with existing code
}

/**
 * Color scheme for different moods
 */
export interface MoodColors {
  primary: string;     // Main background color
  secondary: string;   // Secondary/accent color
  text: string;        // Text color with appropriate contrast
}
