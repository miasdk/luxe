import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { WishlistProvider } from '../../context/WishlistContext';
import ProductCard from '../features/catalog/ProductCard';

// Mock the useAuthContext hook
vi.mock('../../context/AuthContext', () => ({
  useAuthContext: () => ({
    user: { uid: 'test-user-id' },
    loading: false
  })
}));

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  image: 'test-image.jpg',
  brand: 'Test Brand',
  category: 'Test Category',
  stock: 10
};

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          {component}
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('shows add to cart button when in stock', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('shows out of stock message when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    renderWithProviders(<ProductCard product={outOfStockProduct} />);
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('navigates to product detail page when clicked', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const productLink = screen.getByRole('link');
    expect(productLink).toHaveAttribute('href', '/product/1');
  });
}); 