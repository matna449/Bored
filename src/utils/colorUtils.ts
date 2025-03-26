import { MoodAnalysis, MoodColors } from '../types';

/**
 * Generates a color scheme based on the mood analysis
 * @param analysis The mood analysis to generate colors from
 * @returns Object with primary, secondary, and text colors
 */
export const getMoodColors = (analysis: MoodAnalysis): MoodColors => {
  // Base colors for different moods with HSL values for easier manipulation
  const moodBaseColors = {
    positive: { h: 120, s: 60, l: 50 }, // Green hue for positive
    neutral: { h: 200, s: 30, l: 50 },  // Blue hue for neutral
    negative: { h: 0, s: 60, l: 50 },   // Red hue for negative
  };
  
  const baseColor = moodBaseColors[analysis.mood];
  
  // Adjust lightness based on intensity (more intense = more vibrant)
  const intensityAdjustment = analysis.intensity * 20;
  
  // Create a color scheme with appropriate contrast
  return {
    // Primary background color
    primary: `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)`,
    
    // Secondary gradient color (shift hue slightly for visual interest)
    secondary: `hsl(${baseColor.h + 20}, ${baseColor.s}%, ${
      baseColor.l + (analysis.mood === 'positive' ? 10 : -10)
    }%)`,
    
    // Ensure text has good contrast with background
    text: analysis.mood === 'negative' 
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
