import React from 'react';
import styled from 'styled-components';

interface AnalyzedQuote {
  quote: {
    _id: string;
    content: string;
    author: string;
  };
  analysis: {
    score: number;
    comparative: number;
    positive: string[];
    negative: string[];
  };
}

interface QuoteControlsProps {
  onRefresh: () => void;
  analyzedQuote: AnalyzedQuote | null;
}

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const FavoriteButton = styled(Button)`
  background-color: ${props => props.disabled ? '#bdc3c7' : '#e74c3c'};

  &:hover {
    background-color: ${props => props.disabled ? '#bdc3c7' : '#c0392b'};
  }
`;

const QuoteControls: React.FC<QuoteControlsProps> = ({ onRefresh, analyzedQuote }) => {
  const handleSaveFavorite = () => {
    if (!analyzedQuote) return;
    
    // Get existing favorites from localStorage
    const existingFavorites = localStorage.getItem('favoriteQuotes');
    const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
    
    // Add the new favorite if it doesn't already exist
    if (!favorites.some((fav: AnalyzedQuote) => fav.quote._id === analyzedQuote.quote._id)) {
      favorites.push(analyzedQuote);
      localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
      alert('Quote added to favorites!');
    } else {
      alert('This quote is already in your favorites.');
    }
  };

  return (
    <ControlsContainer>
      <Button onClick={onRefresh}>New Quote</Button>
      <FavoriteButton 
        onClick={handleSaveFavorite}
        disabled={!analyzedQuote}
      >
        Save as Favorite
      </FavoriteButton>
    </ControlsContainer>
  );
};

export default QuoteControls;
