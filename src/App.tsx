import React from 'react';
import styled from 'styled-components';
import Layout from './components/Layout';
import QuoteCard from './components/QuoteCard';
import QuoteControls from './components/QuoteControls';
import { useQuote } from './hooks/useQuote';

const LoadingMessage = styled.div`
  font-size: 1.2rem;
  color: #666;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  color: #e74c3c;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: rgba(231, 76, 60, 0.1);
  margin: 2rem 0;
  text-align: center;
  max-width: 600px;
`;

const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const App: React.FC = () => {
  const { 
    quote, 
    analysis, 
    analyzedQuote,
    loading, 
    error, 
    refreshQuote 
  } = useQuote();
  
  return (
    <Layout>
      {loading && <LoadingMessage>Loading your daily inspiration...</LoadingMessage>}
      
      {error && (
        <ErrorMessage>
          {error}
          <RetryButton onClick={() => refreshQuote(true)}>Try Again</RetryButton>
        </ErrorMessage>
      )}
      
      {quote && analysis && (
        <>
          <QuoteCard quote={quote} analysis={analysis} />
          <QuoteControls onRefresh={() => refreshQuote(true)} analyzedQuote={analyzedQuote} />
        </>
      )}
    </Layout>
  );
};

export default App;
