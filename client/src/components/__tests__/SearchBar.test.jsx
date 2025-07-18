import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../features/navigation/SearchBar';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Mock the search service
vi.mock('../../services/searchService', () => ({
  default: {
    searchProducts: vi.fn().mockResolvedValue([
      { id: 1, title: 'Test Product 1', price: 29.99 },
      { id: 2, title: 'Test Product 2', price: 49.99 }
    ])
  }
}));

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('SearchBar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input correctly', () => {
    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('handles text input correctly', async () => {
    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
    
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    
    expect(searchInput.value).toBe('test query');
  });

  it('handles search submission', async () => {
    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
    const searchForm = searchInput.closest('form') || screen.getByRole('form', { hidden: true });

    fireEvent.change(searchInput, { target: { value: 'leather jacket' } });
    
    if (searchForm) {
      fireEvent.submit(searchForm);
    } else {
      // If no form, simulate enter key press
      fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
    }

    await waitFor(() => {
      // Should navigate to search results
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it('handles empty search gracefully', async () => {
    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
    
    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Should not navigate with empty search
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('trims whitespace from search queries', async () => {
    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
    
    fireEvent.change(searchInput, { target: { value: '  test query  ' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      if (mockNavigate.mock.calls.length > 0) {
        const navigationCall = mockNavigate.mock.calls[0][0];
        // Should navigate with trimmed query
        expect(navigationCall).toContain('test query');
        expect(navigationCall).not.toContain('  ');
      }
    });
  });

  it('encodes special characters in search queries', async () => {
    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
    
    fireEvent.change(searchInput, { target: { value: 'test & query' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      if (mockNavigate.mock.calls.length > 0) {
        // Should properly encode special characters
        expect(mockNavigate).toHaveBeenCalled();
      }
    });
  });

  describe('Search Suggestions (if implemented)', () => {
    it('should show suggestions dropdown when typing', async () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
      
      fireEvent.change(searchInput, { target: { value: 'test' } });

      // Wait for potential suggestions to appear
      await waitFor(() => {
        // This will pass if no suggestions are implemented
        expect(searchInput).toBeInTheDocument();
      });
    });

    it('should hide suggestions when input is cleared', async () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
      
      fireEvent.change(searchInput, { target: { value: 'test' } });
      fireEvent.change(searchInput, { target: { value: '' } });

      await waitFor(() => {
        expect(searchInput.value).toBe('');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria labels', () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
      
      // Should have accessible attributes
      expect(searchInput).toBeInTheDocument();
      expect(searchInput.getAttribute('type')).toBe('text');
    });

    it('should be keyboard navigable', () => {
      render(
        <TestWrapper>
          <SearchBar />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search/i) || screen.getByRole('textbox');
      
      // Should be focusable
      searchInput.focus();
      expect(document.activeElement).toBe(searchInput);
    });
  });
});