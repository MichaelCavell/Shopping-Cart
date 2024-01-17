import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from '../src/pages/Shop/Shop';
import { useOutletContext } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: vi.fn(),
}));

describe('Shop Component', () => {
  it('displays loading message when products are not available', () => {
    vi.mocked(useOutletContext).mockReturnValue({ products: null });
    render(<Shop />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders ProductList when products are available', () => {
    const mockProducts = [
        { id: 1, title: 'Product 1', price: 10.99 }, 
        { id: 2, title: 'Product 2', price: 15.49 }
      ];
      const addToCart = vi.fn();
      vi.mocked(useOutletContext).mockReturnValue({ products: mockProducts, addToCart });
    
      render(<Shop />);
      const product1 = screen.getByText('Product 1');
      expect(product1).toBeInTheDocument();
      expect(screen.getByText('$10.99')).toBeInTheDocument();
  });
});
