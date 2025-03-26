import axios from 'axios';
import { Quote } from '../types';

/**
 * Fetches a random quote from the Quotable API
 * @returns Promise resolving to a Quote object
 */
export const fetchRandomQuote = async (): Promise<Quote> => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    return {
      id: response.data._id,
      text: response.data.content,
      author: response.data.author,
      date: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw new Error('Failed to fetch quote. Please try again later.');
  }
};

/**
 * Fetches a quote by category
 * @param category The category to fetch quotes from
 * @returns Promise resolving to a Quote object
 */
export const fetchQuoteByCategory = async (category: string): Promise<Quote> => {
  try {
    const response = await axios.get(`https://api.quotable.io/random?tags=${category}`);
    return {
      id: response.data._id,
      text: response.data.content,
      author: response.data.author,
      date: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching ${category} quote:`, error);
    throw new Error(`Failed to fetch ${category} quote. Please try again later.`);
  }
};
