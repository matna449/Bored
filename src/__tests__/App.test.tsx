import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';

describe('App Component', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('renders loading state initially', () => {
    // Arrange
    mockAxios.onGet().reply(200, {});
    
    // Act
    render(<App />);
    
    // Assert
    expect(screen.getByText(/Loading your daily inspiration/i)).toBeInTheDocument();
  });

  it('renders quote when API call succeeds', async () => {
    // Arrange
    const mockQuote = {
      _id: 'test-id-123',
      content: 'Test quote content',
      author: 'Test Author'
    };
    
    mockAxios.onGet('https://api.quotable.io/random').reply(200, mockQuote);
    
    // Act
    render(<App />);
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText(mockQuote.content)).toBeInTheDocument();
      expect(screen.getByText(`— ${mockQuote.author}`)).toBeInTheDocument();
    });
  });

  it('renders error message when API call fails', async () => {
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
});
