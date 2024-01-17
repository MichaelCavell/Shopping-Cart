import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Product } from '../src/components/Product';


describe('Product Component', () => {
  const mockData = { id: 1, title: 'Test Product', price: 10.99, image: 'test-image.jpg' };
  const addToCart = vi.fn();

  it('renders correctly with initial values', () => {
    render(<Product data={mockData} addToCart={addToCart} cartItemCount={0} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByText('$10.99')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(0);
  });

  it('increments and decrements quantity', () => {
    render(<Product data={mockData} addToCart={addToCart} cartItemCount={0} />);
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');

    fireEvent.click(incrementButton);
    expect(screen.getByRole('spinbutton')).toHaveValue(1);

    fireEvent.click(decrementButton);
    expect(screen.getByRole('spinbutton')).toHaveValue(0);
  });

  it('handles add to cart correctly', async () => {
    render(<Product data={mockData} addToCart={addToCart} cartItemCount={0} />);
    const addToCartButton = screen.getByText(/Add To Cart/i);
    fireEvent.click(addToCartButton); // Without incrementing, quantity remains 0

    // Test if addToCart is not called when quantity is 0
    expect(addToCart).not.toHaveBeenCalled();

    // Increment and then add to cart
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(addToCartButton);
    expect(addToCart).toHaveBeenCalledWith(1, 1);
    expect(screen.getByRole('spinbutton')).toHaveValue(0);
    await waitFor(() => expect(screen.queryByText('Added to cart!')).not.toBeInTheDocument(), { timeout: 2000 });
  });
});
