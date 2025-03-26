import { useState, useEffect } from 'react';
import { Quote, MoodAnalysis, AnalyzedQuote } from '../types';
import { fetchRandomQuote, fetchQuoteByCategory } from '../services/quoteService';
import { analyzeMood } from '../services/sentimentService';
import { getStoredQuote, storeQuote, addToHistory } from '../utils/storageUtils';

interface UseQuoteReturn {
  quote: Quote | null;
  analysis: MoodAnalysis | null;
  analyzedQuote: AnalyzedQuote | null;
  loading: boolean;
  error: string | null;
  refreshQuote: (forceNew?: boolean) => Promise<void>;
  getQuoteByCategory: (category: string) => Promise<void>;
}

export const useQuote = (): UseQuoteReturn => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Derived state combining quote and analysis
  const analyzedQuote = quote && analysis ? { ...quote, analysis } : null;
  
  const loadQuote = async (forceNew = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if we need a new quote (daily update or forced refresh)
      const storedQuote = getStoredQuote();
      const needsNewQuote = forceNew || 
        !storedQuote || 
        new Date(storedQuote.date).toDateString() !== new Date().toDateString();
      
      let currentQuote;
      if (needsNewQuote) {
        currentQuote = await fetchRandomQuote();
        storeQuote(currentQuote);
      } else {
        currentQuote = storedQuote;
      }
      
      setQuote(currentQuote);
      
      // Analyze the quote
      const moodAnalysis = analyzeMood(currentQuote.text);
      setAnalysis(moodAnalysis);
      
      // Add to history
      if (needsNewQuote && moodAnalysis) {
        addToHistory({ ...currentQuote, analysis: moodAnalysis });
      }
    } catch (err) {
      setError('Failed to load quote. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const getQuoteByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentQuote = await fetchQuoteByCategory(category);
      setQuote(currentQuote);
      
      // Analyze the quote
      const moodAnalysis = analyzeMood(currentQuote.text);
      setAnalysis(moodAnalysis);
      
      // Store the quote and add to history
      storeQuote(currentQuote);
      if (moodAnalysis) {
        addToHistory({ ...currentQuote, analysis: moodAnalysis });
      }
    } catch (err) {
      setError(`Failed to load a ${category} quote. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Load quote on initial mount
  useEffect(() => {
    loadQuote();
  }, []);
  
  return {
    quote,
    analysis,
    analyzedQuote,
    loading,
    error,
    refreshQuote: loadQuote,
    getQuoteByCategory
  };
};
