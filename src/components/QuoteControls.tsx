import React from 'react';
import styled from 'styled-components';
import { AnalyzedQuote } from '../types';
import { addToFavorites, removeFromFavorites, getFavorites } from '../utils/storageUtils';

interface QuoteControlsProps {
  onRefresh: () => Promise<void>;
  analyzedQuote: AnalyzedQuote | null;
}

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #3a80d2;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const FavoriteButton = styled(Button)<{ isFavorite: boolean }>`
  background-color: ${props => props.isFavorite ? '#e25c5c' : '#4a90e2'};
  
  &:hover {
    background-color: ${props => props.isFavorite ? '#d24c4c' : '#3a80d2'};
  }
`;

const ShareButton = styled(Button)`
  background-color: #42b983;
  
  &:hover {
    background-color: #32a973;
  }
`;

const QuoteControls: React.FC<QuoteControlsProps> = ({ onRefresh, analyzedQuote }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  // Check if current quote is in favorites
  React.useEffect(() => {
    if (analyzedQuote) {
      const favorites = getFavorites();
      setIsFavorite(favorites.some(fav => fav.id === analyzedQuote.id));
    }
  }, [analyzedQuote]);
  
  const handleFavoriteToggle = () => {
    if (!analyzedQuote) return;
    
    if (isFavorite) {
      removeFromFavorites(analyzedQuote.id);
      setIsFavorite(false);
    } else {
      addToFavorites(analyzedQuote);
      setIsFavorite(true);
    }
  };
  
  const handleShare = () => {
    if (!analyzedQuote) return;
    
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Daily Quote & Mood',
        text: `"${analyzedQuote.text}" — ${analyzedQuote.author}`,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`"${analyzedQuote.text}" — ${analyzedQuote.author}`)
        .then(() => alert('Quote copied to clipboard!'))
        .catch(err => console.error('Failed to copy:', err));
    }
  };
  
  return (
    <ControlsContainer>
      <Button onClick={() => onRefresh()} disabled={!analyzedQuote}>
        New Quote
      </Button>
      
      <FavoriteButton 
        onClick={handleFavoriteToggle} 
        disabled={!analyzedQuote}
        isFavorite={isFavorite}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </FavoriteButton>
      
      <ShareButton onClick={handleShare} disabled={!analyzedQuote}>
        Share Quote
      </ShareButton>
    </ControlsContainer>
  );
};

export default QuoteControls;
