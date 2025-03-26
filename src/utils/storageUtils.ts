import { Quote, AnalyzedQuote } from '../types';

// Storage keys
const CURRENT_QUOTE_KEY = 'bored_current_quote';
const FAVORITE_QUOTES_KEY = 'bored_favorite_quotes';
const QUOTE_HISTORY_KEY = 'bored_quote_history';

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
 * Adds a quote to favorites
 * @param quote The quote to add to favorites
 */
export const addToFavorites = (quote: AnalyzedQuote): void => {
  try {
    const favorites = getFavorites();
    // Check if quote already exists in favorites
    if (!favorites.some(fav => fav.id === quote.id)) {
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
    const favorites = getFavorites().filter(quote => quote.id !== quoteId);
    localStorage.setItem(FAVORITE_QUOTES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to remove quote from favorites:', error);
  }
};

/**
 * Gets all favorite quotes
 * @returns Array of favorite quotes
 */
export const getFavorites = (): AnalyzedQuote[] => {
  try {
    const favorites = localStorage.getItem(FAVORITE_QUOTES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Failed to retrieve favorites:', error);
    return [];
  }
};

/**
 * Adds a quote to history
 * @param quote The quote to add to history
 */
export const addToHistory = (quote: AnalyzedQuote): void => {
  try {
    const history = getHistory();
    // Add to beginning of array (most recent first)
    history.unshift({ ...quote, viewed: new Date().toISOString() });
    // Limit history to 50 items
    const limitedHistory = history.slice(0, 50);
    localStorage.setItem(QUOTE_HISTORY_KEY, JSON.stringify(limitedHistory));
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
