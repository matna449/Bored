import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getRandomQuote, checkApiAvailability } from '../../services/quoteService';

describe('Quote Service', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should fetch a random quote successfully', async () => {
    // Arrange
    const mockQuote = {
      _id: 'test-id-123',
      content: 'Test quote content',
      author: 'Test Author',
      tags: ['wisdom', 'test']
    };
    
    mockAxios.onGet('https://api.quotable.io/random').reply(200, mockQuote);
    
    // Act
    const result = await getRandomQuote();
    
    // Assert
    expect(result).toBeDefined();
    expect(result._id).toBe(mockQuote._id);
    expect(result.content).toBe(mockQuote.content);
    expect(result.author).toBe(mockQuote.author);
  });

  it('should return a fallback quote when API returns an error', async () => {
    // Arrange
    mockAxios.onGet('https://api.quotable.io/random').reply(500);
    
    // Act
    const result = await getRandomQuote();
    
    // Assert
    expect(result).toBeDefined();
    expect(result._id).toContain('fallback-');
    expect(result.content).toBeTruthy();
    expect(result.author).toBeTruthy();
  });

  it('should return a fallback quote when network error occurs', async () => {
    // Arrange
    mockAxios.onGet('https://api.quotable.io/random').networkError();
    
    // Act
    const result = await getRandomQuote();
    
    // Assert
    expect(result).toBeDefined();
    expect(result._id).toContain('fallback-');
  });

  it('should return a fallback quote when timeout occurs', async () => {
    // Arrange
    mockAxios.onGet('https://api.quotable.io/random').timeout();
    
    // Act
    const result = await getRandomQuote();
    
    // Assert
    expect(result).toBeDefined();
    expect(result.content).toBeTruthy();
  });

  it('should correctly check API availability', async () => {
    // Arrange
    mockAxios.onGet('https://api.quotable.io/health-check').reply(200);
    
    // Act
    const result = await checkApiAvailability();
    
    // Assert
    expect(result).toBe(true);
  });

  it('should return false when API health check fails', async () => {
    // Arrange
    mockAxios.onGet('https://api.quotable.io/health-check').reply(500);
    
    // Act
    const result = await checkApiAvailability();
    
    // Assert
    expect(result).toBe(false);
  });
});
