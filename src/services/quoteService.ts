import axios from 'axios';
import { Quote } from '../types';

// Fallback quotes in case the API fails
const fallbackQuotes: Quote[] = [
  {
    _id: 'fallback-1',
    content: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs'
  },
  {
    _id: 'fallback-2',
    content: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon'
  },
  {
    _id: 'fallback-3',
    content: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    _id: 'fallback-4',
    content: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein'
  }
];

/**
 * Fetches a random quote from the API
 * @returns Promise with quote data
 */
export const getRandomQuote = async (): Promise<Quote> => {
  try {
    // Configure timeout and retry logic
    const response = await axios.get('https://api.quotable.io/random', {
      timeout: 5000, // 5 seconds timeout
    });
    
    return {
      _id: response.data._id,
      content: response.data.content,
      author: response.data.author
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    // If API fails, return a random fallback quote
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  }
};

/**
 * Fetches a quote by a specific category/tag
 * @param category The category/tag to filter by
 * @returns Promise with quote data
 */
export const getQuoteByCategory = async (category: string): Promise<Quote> => {
  try {
    const response = await axios.get(`https://api.quotable.io/random?tags=${category}`, {
      timeout: 5000, // 5 seconds timeout
    });
    
    return {
      _id: response.data._id,
      content: response.data.content,
      author: response.data.author
    };
  } catch (error) {
    console.error(`Error fetching quote with category "${category}":`, error);
    // If API fails, return a random fallback quote
    return getRandomQuote();
  }
};

/**
 * Checks if the Quotable API is currently available
 * @returns Promise resolving to a boolean indicating if the API is available
 */
export const checkApiAvailability = async (): Promise<boolean> => {
  try {
    await axios.get('https://api.quotable.io/health-check', {
      timeout: 3000
    });
    return true;
  } catch (error) {
    console.error('API availability check failed:', error);
    return false;
  }
};
