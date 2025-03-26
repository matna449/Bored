import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../../App';

describe('Quote Feature End-to-End Tests', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    mockAxios.restore();
    jest.restoreAllMocks();
  });

  it('should display a quote on initial load', async () => {
    // Arrange
    const mockQuote = {
      _id: 'test-id-123',
      content: 'Life is what you make it',
      author: 'Test Author'
    };
    
    mockAxios.onGet('https://api.quotable.io/random').reply(200, mockQuote);
    
    // Act
    render(<App />);
    
    // Assert
    expect(screen.getByText(/Loading your daily inspiration/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(mockQuote.content)).toBeInTheDocument();
      expect(screen.getByText(`— ${mockQuote.author}`)).toBeInTheDocument();
    });
  });

  it('should allow user to request a new quote', async () => {
    // Arrange
    const firstQuote = {
      _id: 'quote-1',
      content: 'First quote content',
      author: 'Author One'
    };
    
    const secondQuote = {
      _id: 'quote-2',
      content: 'Second quote content',
      author: 'Author Two'
    };
    
    mockAxios.onGet('https://api.quotable.io/random').replyOnce(200, firstQuote);
    
    // Act
    render(<App />);
    
    // Wait for first quote to load
    await waitFor(() => {
      expect(screen.getByText(firstQuote.content)).toBeInTheDocument();
    });
    
    // Set up mock for second request
    mockAxios.onGet('https://api.quotable.io/random').replyOnce(200, secondQuote);
    
    // Click the refresh button
    const refreshButton = screen.getByText('New Quote');
    fireEvent.click(refreshButton);
    
    // Assert
    expect(screen.getByText(/Loading your daily inspiration/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(secondQuote.content)).toBeInTheDocument();
      expect(screen.getByText(`— ${secondQuote.author}`)).toBeInTheDocument();
    });
  });

  it('should handle API errors and show error message', async () => {
    // Arrange
    mockAxios.onGet('https://api.quotable.io/random').networkError();
    
    // Act
    render(<App />);
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch a quote/i)).toBeInTheDocument();
      expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
    });
  });
  
  it('should allow user to try again after error', async () => {
    // Arrange - First request fails
    mockAxios.onGet('https://api.quotable.io/random').replyOnce(500);
    
    // Act
    render(<App />);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch a quote/i)).toBeInTheDocument();
    });
    
    // Setup successful response for retry
    const successQuote = {
      _id: 'success-id',
      content: 'Success quote content',
      author: 'Successful Author'
    };
    mockAxios.onGet('https://api.quotable.io/random').replyOnce(200, successQuote);
    
    // Click try again
    const tryAgainButton = screen.getByText('Try Again');
    fireEvent.click(tryAgainButton);
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText(successQuote.content)).toBeInTheDocument();
    });
  });
});
