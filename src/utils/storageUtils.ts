import { Quote, AnalyzedQuote } from '../types';

// Storage keys
const CURRENT_QUOTE_KEY = 'bored_current_quote';
const FAVORITE_QUOTES_KEY = 'favoriteQuotes';
const QUOTE_HISTORY_KEY = 'quoteHistory';

/**
 * Stores the current quote in localStorage
 * @param quote The quote to store
 */
export const storeQuote = (quote: Quote): void => {
  try {
    localStorage.setItem(CURRENT_QUOTE_KEY, JSON.stringify(quote));
  } catch (error) {
    console.error('Failed to store quote:', error);
  }
};

/**
 * Retrieves the stored quote from localStorage
 * @returns The stored quote or null if none exists
 */
export const getStoredQuote = (): Quote | null => {
  try {
    const storedQuote = localStorage.getItem(CURRENT_QUOTE_KEY);
    return storedQuote ? JSON.parse(storedQuote) : null;
  } catch (error) {
    console.error('Failed to retrieve stored quote:', error);
    return null;
  }
};

/**
 * Gets all favorite quotes from local storage
 * @returns Array of favorite quotes
 */
export const getFavorites = (): AnalyzedQuote[] => {
  try {
    const favoritesData = localStorage.getItem(FAVORITE_QUOTES_KEY);
    return favoritesData ? JSON.parse(favoritesData) : [];
  } catch (error) {
    console.error('Failed to get favorites:', error);
    return [];
  }
};

/**
 * Gets all quote history from local storage
 * @returns Array of viewed quotes
 */
export const getQuoteHistory = (): AnalyzedQuote[] => {
  try {
    const historyData = localStorage.getItem(QUOTE_HISTORY_KEY);
    return historyData ? JSON.parse(historyData) : [];
  } catch (error) {
    console.error('Failed to get quote history:', error);
    return [];
  }
};

/**
 * Adds a quote to favorites
 * @param quote Quote to add to favorites
 */
export const addToFavorites = (quote: AnalyzedQuote): void => {
  try {
    const favorites = getFavorites();
    
    // Add ID if not present
    const quoteId = quote.id || quote.quote._id;
    
    // Check if quote already exists in favorites
    if (!favorites.some(fav => {
      const favId = fav.id || (fav.quote && fav.quote._id);
      return favId === quoteId;
    })) {
      // Ensure quote has an id field for compatibility
      if (!quote.id) {
        quote.id = quote.quote._id;
      }
      
      favorites.push(quote);
      localStorage.setItem(FAVORITE_QUOTES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Failed to add quote to favorites:', error);
  }
};

/**
 * Removes a quote from favorites
 * @param quoteId The ID of the quote to remove
 */
export const removeFromFavorites = (quoteId: string): void => {
  try {
    const favorites = getFavorites().filter(quote => {
      const id = quote.id || (quote.quote && quote.quote._id);
      return id !== quoteId;
    });
    localStorage.setItem(FAVORITE_QUOTES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to remove quote from favorites:', error);
  }
};

/**
 * Adds a quote to history
 * @param quote Quote to add to history
 * @param maxHistorySize Maximum number of quotes to keep in history
 */
export const addToHistory = (quote: AnalyzedQuote, maxHistorySize = 50): void => {
  try {
    let history = getQuoteHistory();
    
    // Ensure quote has an id field for compatibility
    if (!quote.id) {
      quote.id = quote.quote._id;
    }
    
    // Add to front of history (most recent first)
    history.unshift(quote);
    
    // Trim history to max size
    if (history.length > maxHistorySize) {
      history = history.slice(0, maxHistorySize);
    }
    
    localStorage.setItem(QUOTE_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to add quote to history:', error);
  }
};

/**
 * Gets quote history
 * @returns Array of historical quotes
 */
export const getHistory = (): (AnalyzedQuote & { viewed: string })[] => {
  try {
    const history = localStorage.getItem(QUOTE_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to retrieve quote history:', error);
    return [];
  }
};
