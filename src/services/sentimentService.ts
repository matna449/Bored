import Sentiment from 'sentiment';
import { MoodAnalysis } from '../types';

// Initialize the sentiment analyzer
const sentiment = new Sentiment();

/**
 * Analyzes the mood/sentiment of a given text
 * @param text Text to analyze
 * @returns MoodAnalysis object with sentiment data
 */
export const analyzeMood = (text: string): MoodAnalysis => {
  // Get raw sentiment analysis
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
    score: normalizedScore,
    mood,
    intensity,
    words: {
      positive: analysis.positive,
      negative: analysis.negative
    }
  };
};
