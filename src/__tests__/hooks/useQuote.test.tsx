import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useQuote } from '../../hooks/useQuote';

describe('useQuote Hook', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should set loading state initially', () => {
    // Arrange & Act
    const { result } = renderHook(() => useQuote());
    
    // Assert
    expect(result.current.loading).toBe(true);
  });

  it('should fetch a quote and update state on successful API call', async () => {
    // Arrange
    const mockQuote = {
      _id: 'test-id-123',
      content: 'Test quote content',
      author: 'Test Author'
    };
    
    mockAxios.onGet('https://api.quotable.io/random').reply(200, mockQuote);
    
    // Act
    const { result, waitForNextUpdate } = renderHook(() => useQuote());
    await waitForNextUpdate();
    
    // Assert
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.quote).toEqual(mockQuote);
    expect(result.current.analysis).toBeDefined();
  });

  it('should set error state on API failure', async () => {
    // Arrange
    mockAxios.onGet('https://api.quotable.io/random').networkError();
    
    // Act
    const { result, waitForNextUpdate } = renderHook(() => useQuote());
    await waitForNextUpdate();
    
    // Assert
    expect(result.current.loading).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.quote).toBeNull();
  });

  it('should refresh quote when refreshQuote is called', async () => {
    // Arrange
    const mockQuote1 = {
      _id: 'test-id-123',
      content: 'First quote content',
      author: 'First Author'
    };
    
    const mockQuote2 = {
      _id: 'test-id-456',
      content: 'Second quote content',
      author: 'Second Author'
    };
    
    mockAxios.onGet('https://api.quotable.io/random').replyOnce(200, mockQuote1);
    
    // Act - Initial render
    const { result, waitForNextUpdate } = renderHook(() => useQuote());
    await waitForNextUpdate();
    
    // Update mock and refresh
    mockAxios.onGet('https://api.quotable.io/random').replyOnce(200, mockQuote2);
    
    // Act - Refresh
    act(() => {
      result.current.refreshQuote();
    });
    
    await waitForNextUpdate();
    
    // Assert
    expect(result.current.quote?.content).toBe(mockQuote2.content);
  });
});
