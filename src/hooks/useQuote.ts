import { useState, useEffect, useCallback } from 'react';
import { analyzeText } from '../services/sentimentService';
import { Quote, MoodAnalysis, AnalyzedQuote } from '../types';
import { getRandomQuote } from '../services/quoteService';

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [analyzedQuote, setAnalyzedQuote] = useState<AnalyzedQuote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the service which handles fallbacks
      const newQuote = await getRandomQuote();
      
      // Analyze the quote text
      const newAnalysis = analyzeText(newQuote.content);
      
      setQuote(newQuote);
      setAnalysis(newAnalysis);
      setAnalyzedQuote({
        quote: newQuote,
        analysis: newAnalysis
      });
      setLoading(false);
    } catch (err) {
      console.error('Error in useQuote hook:', err);
      setError('Failed to fetch a quote. Please try again.');
      setLoading(false);
    }
  }, []);

  // Fetch quote on initial load
  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return {
    quote,
    analysis,
    analyzedQuote,
    loading,
    error,
    refreshQuote: fetchQuote
  };
};
