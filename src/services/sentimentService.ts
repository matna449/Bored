import Sentiment from 'sentiment';
import { MoodAnalysis } from '../types';

// Initialize the sentiment analyzer
const sentiment = new Sentiment();

export interface SentimentResult {
  score: number;
  comparative: number;
  positive: string[];
  negative: string[];
}

/**
 * Analyzes text to determine its sentiment/mood
 * @param text The text to analyze
 * @returns Sentiment analysis result
 */
export const analyzeText = (text: string): MoodAnalysis => {
  const analysis = sentiment.analyze(text);
  
  // Normalize score to a range of -1 to 1
  const normalizedScore = analysis.comparative;
  
  // Determine mood category based on score threshold
  let mood: 'positive' | 'negative' | 'neutral';
  if (normalizedScore > 0.2) mood = 'positive';
  else if (normalizedScore < -0.2) mood = 'negative';
  else mood = 'neutral';
  
  // Calculate intensity as a value from 0 to 1
  const intensity = Math.min(Math.abs(normalizedScore * 2), 1);
  
  return {
    score: analysis.score,
    comparative: analysis.comparative,
    positive: analysis.positive,
    negative: analysis.negative,
    mood,
    intensity,
    words: {
      positive: analysis.positive,
      negative: analysis.negative
    }
  };
};

/**
 * Get a mood label based on sentiment score
 * @param score The sentiment score
 * @returns A descriptive mood label
 */
export const getMoodLabel = (score: number): string => {
  if (score > 2) return 'Very Positive';
  if (score > 0) return 'Positive';
  if (score === 0) return 'Neutral';
  if (score > -2) return 'Negative';
  return 'Very Negative';
};
