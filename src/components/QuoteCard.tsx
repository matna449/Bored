import React from 'react';
import styled from 'styled-components';
import { Quote, MoodAnalysis } from '../types';
import { useSentimentAnalysis } from '../hooks/useSentimentAnalysis';
import MoodIndicator from './MoodIndicator';

interface QuoteCardProps {
  quote: Quote;
  analysis: MoodAnalysis;
}

const Card = styled.div<{ colors: ReturnType<typeof useSentimentAnalysis>['colors'] }>`
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  margin: 2rem auto;
  background: linear-gradient(135deg, 
    ${props => props.colors.primary}, 
    ${props => props.colors.secondary}
  );
  color: ${props => props.colors.text};
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const QuoteText = styled.blockquote`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
  position: relative;
  padding: 0.5rem 1rem;
  
  &::before, &::after {
    content: '"';
    font-size: 2rem;
    opacity: 0.6;
  }
  
  &::after {
    content: '"';
  }
`;

const QuoteAuthor = styled.p`
  font-size: 1rem;
  text-align: right;
  font-weight: bold;
  margin-top: 1rem;
`;

const QuoteDate = styled.p`
  font-size: 0.8rem;
  text-align: right;
  opacity: 0.7;
`;

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, analysis }) => {
  const { colors } = useSentimentAnalysis(analysis);
  
  // Format date to be more readable
  const formattedDate = new Date(quote.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Card colors={colors}>
      <MoodIndicator analysis={analysis} />
      <QuoteText>{quote.text}</QuoteText>
      <QuoteAuthor>— {quote.author}</QuoteAuthor>
      <QuoteDate>From {formattedDate}</QuoteDate>
    </Card>
  );
};

export default QuoteCard;
