import { useMemo } from 'react';
import { MoodAnalysis } from '../types';
import { getMoodColors } from '../utils/colorUtils';

interface UseSentimentAnalysisReturn {
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  moodLabel: string;
  intensityPercentage: number;
  keyWords: {
    positive: string[];
    negative: string[];
  };
}

export const useSentimentAnalysis = (analysis: MoodAnalysis | null): UseSentimentAnalysisReturn => {
  // Generate colors based on the mood analysis
  const colors = useMemo(() => {
    if (!analysis) {
      // Default neutral colors if no analysis is available
      return getMoodColors({
        score: 0,
        comparative: 0,
        positive: [],
        negative: [],
        mood: 'neutral',
        intensity: 0.5,
        words: { positive: [], negative: [] }
      });
    }
    return getMoodColors(analysis);
  }, [analysis]);
  
  // Create a descriptive mood label
  const moodLabel = useMemo(() => {
    if (!analysis || !analysis.mood) {
      return 'Neutral';
    }
    
    // Map mood and intensity to a more descriptive label
    const intensityModifier = (analysis.intensity || 0) < 0.3 
      ? 'Slightly ' 
      : (analysis.intensity || 0) < 0.7 
        ? 'Moderately ' 
        : 'Very ';
    
    const mood = analysis.mood || 'neutral';
    return `${intensityModifier}${mood.charAt(0).toUpperCase()}${mood.slice(1)}`;
  }, [analysis]);
  
  // Convert intensity to percentage for display
  const intensityPercentage = useMemo(() => {
    return analysis ? Math.round((analysis.intensity || 0.5) * 100) : 50;
  }, [analysis]);
  
  // Extract key words that influenced the sentiment
  const keyWords = useMemo(() => {
    if (!analysis || !analysis.words) return { positive: [], negative: [] };
    return analysis.words;
  }, [analysis]);
  
  return {
    colors,
    moodLabel,
    intensityPercentage,
    keyWords
  };
};
