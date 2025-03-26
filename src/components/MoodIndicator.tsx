import React from 'react';
import styled from 'styled-components';
import { MoodAnalysis } from '../types';

interface MoodIndicatorProps {
  analysis: MoodAnalysis;
}

const Container = styled.div`
  margin: 1.5rem 0;
  width: 100%;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const MoodName = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const Percentage = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const MeterContainer = styled.div`
  height: 0.5rem;
  background-color: #eee;
  border-radius: 1rem;
  overflow: hidden;
`;

interface MeterFillProps {
  width: number;
  mood: string;
}

const MeterFill = styled.div<MeterFillProps>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => {
    switch (props.mood || 'neutral') {
      case 'positive': return '#27ae60';
      case 'negative': return '#e74c3c';
      default: return '#3498db';
    }
  }};
  border-radius: 1rem;
  transition: width 0.5s ease-out;
`;

const Keywords = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.85rem;
`;

const Keyword = styled.span<{ type: 'positive' | 'negative' }>`
  background-color: ${props => props.type === 'positive' ? '#e3f4e1' : '#fadbd8'};
  color: ${props => props.type === 'positive' ? '#27ae60' : '#c0392b'};
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
`;

const MoodIndicator: React.FC<MoodIndicatorProps> = ({ analysis }) => {
  const intensityPercentage = Math.round((analysis.intensity || 0.5) * 100);
  
  // Get mood label
  const getMoodLabel = (analysis: MoodAnalysis): string => {
    const mood = analysis.mood || 'neutral';
    const intensity = analysis.intensity || 0.5;
    
    const intensityLabel = 
      intensity < 0.3 ? 'Slightly ' : 
      intensity < 0.7 ? 'Moderately ' : 
      'Very ';
      
    return `${intensityLabel}${mood.charAt(0).toUpperCase()}${mood.slice(1)}`;
  };

  return (
    <Container>
      <Label>
        <MoodName>{getMoodLabel(analysis)}</MoodName>
        <Percentage>{intensityPercentage}%</Percentage>
      </Label>
      
      <MeterContainer>
        <MeterFill 
          width={intensityPercentage} 
          mood={analysis.mood || 'neutral'}
          role="progressbar"
          aria-valuenow={intensityPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </MeterContainer>
      
      {analysis.words && (
        <Keywords>
          {analysis.words.positive.slice(0, 3).map((word, index) => (
            <Keyword key={`positive-${index}`} type="positive">{word}</Keyword>
          ))}
          {analysis.words.negative.slice(0, 3).map((word, index) => (
            <Keyword key={`negative-${index}`} type="negative">{word}</Keyword>
          ))}
        </Keywords>
      )}
    </Container>
  );
};

export default MoodIndicator;
