import React from 'react';
import styled from 'styled-components';

interface QuoteProps {
  _id: string;
  content: string;
  author: string;
}

interface SentimentAnalysis {
  score: number;
  comparative: number;
  positive: string[];
  negative: string[];
}

interface QuoteCardProps {
  quote: QuoteProps;
  analysis: SentimentAnalysis;
}

const CardContainer = styled.div<{ mood: number }>`
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: ${({ mood }) => {
    if (mood > 2) return '#e3f4e1'; // Very positive
    if (mood > 0) return '#edf7fc'; // Positive
    if (mood === 0) return '#f5f5f5'; // Neutral
    if (mood > -2) return '#fdeaea'; // Negative
    return '#fadbd8'; // Very negative
  }};
  transition: all 0.3s ease;
`;

const QuoteText = styled.blockquote`
  font-size: 1.6rem;
  line-height: 1.6;
  font-style: italic;
  margin: 0 0 1.5rem;
`;

const Author = styled.cite`
  display: block;
  text-align: right;
  font-size: 1.2rem;
  font-weight: 500;
`;

const MoodIndicator = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MoodLabel = styled.span<{ mood: number }>`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ mood }) => {
    if (mood > 2) return '#27ae60';
    if (mood > 0) return '#3498db';
    if (mood === 0) return '#7f8c8d';
    if (mood > -2) return '#e67e22';
    return '#c0392b';
  }};
`;

const MoodScore = styled.span`
  font-size: 1rem;
  color: #666;
`;

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, analysis }) => {
  const getMoodLabel = (score: number): string => {
    if (score > 2) return 'Very Positive';
    if (score > 0) return 'Positive';
    if (score === 0) return 'Neutral';
    if (score > -2) return 'Negative';
    return 'Very Negative';
  };

  return (
    <CardContainer mood={analysis.score}>
      <QuoteText>{quote.content}</QuoteText>
      <Author>— {quote.author}</Author>
      
      <MoodIndicator>
        <MoodLabel mood={analysis.score}>
          Mood: {getMoodLabel(analysis.score)}
        </MoodLabel>
        <MoodScore>Score: {analysis.score}</MoodScore>
      </MoodIndicator>
    </CardContainer>
  );
};

export default QuoteCard;
