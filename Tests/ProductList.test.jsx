import { render, screen } from '@testing-library/react';
import ProductList from '../src/components/ProductList';

vi.mock('../path-to-Product', () => ({
  Product: vi.fn(() => null), // Mock Product component
}));

describe('ProductList Component', () => {
  it('displays loading message when no products are available', () => {
    render(<ProductList products={null} />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders products correctly', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', price: 10.99 },
      { id: 2, title: 'Product 2', price: 15.49 },
    ];
    render(<ProductList products={mockProducts} addToCart={() => {}} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
