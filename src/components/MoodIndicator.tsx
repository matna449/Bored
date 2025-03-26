import React from 'react';
import styled from 'styled-components';
import { MoodAnalysis } from '../types';
import { useSentimentAnalysis } from '../hooks/useSentimentAnalysis';

interface MoodIndicatorProps {
  analysis: MoodAnalysis;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const MoodLabel = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const MeterContainer = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const MeterFill = styled.div<{ width: number; mood: string }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => {
    if (props.mood === 'positive') return 'rgba(0, 150, 0, 0.8)';
    if (props.mood === 'negative') return 'rgba(200, 0, 0, 0.8)';
    return 'rgba(0, 100, 200, 0.8)';
  }};
  transition: width 0.5s ease-in-out;
`;

const KeyWords = styled.div`
  display: flex;
  font-size: 0.8rem;
  gap: 1rem;
  opacity: 0.8;
`;

const WordList = styled.span<{ type: 'positive' | 'negative' }>`
  color: ${props => props.type === 'positive' ? 'darkgreen' : 'darkred'};
`;

const MoodIndicator: React.FC<MoodIndicatorProps> = ({ analysis }) => {
  const { moodLabel, intensityPercentage, keyWords } = useSentimentAnalysis(analysis);
  
  // Only show a few key words to avoid cluttering the UI
  const limitedPositive = keyWords.positive.slice(0, 3);
  const limitedNegative = keyWords.negative.slice(0, 3);
  
  return (
    <Container>
      <MoodLabel aria-label={`Quote mood: ${moodLabel}, intensity ${intensityPercentage}%`}>
        {moodLabel} ({intensityPercentage}%)
      </MoodLabel>
      
      <MeterContainer>
        <MeterFill 
          width={intensityPercentage} 
          mood={analysis.mood}
          role="progressbar"
          aria-valuenow={intensityPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </MeterContainer>
      
      {(limitedPositive.length > 0 || limitedNegative.length > 0) && (
        <KeyWords>
          {limitedPositive.length > 0 && (
            <div>
              Key positive: <WordList type="positive">{limitedPositive.join(', ')}</WordList>
            </div>
          )}
          
          {limitedNegative.length > 0 && (
            <div>
              Key negative: <WordList type="negative">{limitedNegative.join(', ')}</WordList>
            </div>
          )}
        </KeyWords>
      )}
    </Container>
  );
};

export default MoodIndicator;
