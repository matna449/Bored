import { useMemo } from 'react';
import { MoodAnalysis, MoodColors } from '../types';
import { getMoodColors } from '../utils/colorUtils';

interface UseSentimentAnalysisReturn {
  colors: MoodColors;
  moodLabel: string;
  intensityPercentage: number;
  keyWords: {
    positive: string[];
    negative: string[];
  };
}

export const useSentimentAnalysis = (
  analysis: MoodAnalysis | null
): UseSentimentAnalysisReturn => {
  // Calculate colors based on mood analysis
  const colors = useMemo(() => {
    if (!analysis) {
      // Default neutral colors if no analysis is available
      return getMoodColors({
        score: 0,
        mood: 'neutral',
        intensity: 0.5,
        words: { positive: [], negative: [] }
      });
    }
    return getMoodColors(analysis);
  }, [analysis]);
  
  // Generate a human-readable mood label
  const moodLabel = useMemo(() => {
    if (!analysis) return 'Neutral';
    
    // Map mood and intensity to a more descriptive label
    const intensityModifier = analysis.intensity < 0.3 
      ? 'Slightly ' 
      : analysis.intensity < 0.7 
        ? 'Moderately ' 
        : 'Very ';
    
    return `${intensityModifier}${analysis.mood.charAt(0).toUpperCase()}${analysis.mood.slice(1)}`;
  }, [analysis]);
  
  // Convert intensity to percentage for display
  const intensityPercentage = useMemo(() => {
    return analysis ? Math.round(analysis.intensity * 100) : 50;
  }, [analysis]);
  
  // Extract key words that influenced the sentiment
  const keyWords = useMemo(() => {
    if (!analysis) return { positive: [], negative: [] };
    return analysis.words;
  }, [analysis]);
  
  return {
    colors,
    moodLabel,
    intensityPercentage,
    keyWords
  };
};
