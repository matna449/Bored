import { MoodAnalysis, MoodColors } from '../types';

/**
 * Generates a color scheme based on the mood analysis
 * @param analysis Mood analysis data
 * @returns Color scheme object
 */
export const getMoodColors = (analysis: MoodAnalysis): MoodColors => {
  // HSL color bases for different moods
  const moodBaseColors: Record<string, { h: number, s: number, l: number }> = {
    positive: { h: 120, s: 40, l: 80 }, // Green hue
    neutral: { h: 210, s: 10, l: 85 },  // Slight blue hue
    negative: { h: 0, s: 60, l: 80 }    // Red hue
  };
  
  const mood = analysis.mood || 'neutral';
  const baseColor = moodBaseColors[mood];
  
  // Adjust lightness based on intensity (more intense = more vibrant)
  const intensityAdjustment = (analysis.intensity || 0.5) * 20;
  
  // Create a color scheme with appropriate contrast
  return {
    // Base background color
    primary: `hsl(${baseColor.h}, ${baseColor.s}%, ${
      baseColor.l - intensityAdjustment
    }%)`,
    
    // Secondary gradient color (shift hue slightly for visual interest)
    secondary: `hsl(${baseColor.h + 20}, ${baseColor.s}%, ${
      baseColor.l + (mood === 'positive' ? 10 : -10)
    }%)`,
    
    // Ensure text has good contrast with background
    text: mood === 'negative' 
      ? `hsl(0, 0%, 95%)` // Light text for dark backgrounds
      : `hsl(0, 0%, 15%)`, // Dark text for light backgrounds
  };
};

/**
 * Determines if a color should use light or dark text for accessibility
 * @param backgroundColor HSL background color
 * @returns Boolean indicating if text should be light
 */
export const shouldUseLightText = (backgroundColor: string): boolean => {
  // Extract HSL values from the string
  const hslMatch = backgroundColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!hslMatch) return false;
  
  const l = parseInt(hslMatch[3], 10);
  // Use light text if background is dark (lower lightness)
  return l < 50;
};
