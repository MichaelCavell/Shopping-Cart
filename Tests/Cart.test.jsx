import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../src/pages/Cart/Cart';
import { useOutletContext } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: vi.fn(),
}));

describe('Cart Component', () => {
  const mockCart = [
    { id: 1, title: 'Item 1', price: 10.99, quantity: 2, image: 'image1.jpg' },
    { id: 2, title: 'Item 2', price: 20.00, quantity: 1, image: 'image2.jpg' }
  ];

  it('displays empty cart message when cart is empty', () => {
    vi.mocked(useOutletContext).mockReturnValue({ cart: [] });
    render(<Cart />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders cart items when cart is not empty', () => {
    vi.mocked(useOutletContext).mockReturnValue({ 
      cart: mockCart, 
      removeFromCart: vi.fn(), 
      updateCartQuantity: vi.fn() 
    });
    render(<Cart />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Total: $41.98')).toBeInTheDocument();
    });
    
    it('calls updateCartQuantity with decreased value on minus button click', () => {
    const updateCartQuantity = vi.fn();
    vi.mocked(useOutletContext).mockReturnValue({
    cart: mockCart,
    removeFromCart: vi.fn(),
    updateCartQuantity
    });
    render(<Cart />);
    fireEvent.click(screen.getAllByText('-')[0]);
    expect(updateCartQuantity).toHaveBeenCalledWith(1, 1); // Assuming the first item's quantity is decremented
    });
    
    it('calls updateCartQuantity with increased value on plus button click', () => {
    const updateCartQuantity = vi.fn();
    vi.mocked(useOutletContext).mockReturnValue({
    cart: mockCart,
    removeFromCart: vi.fn(),
    updateCartQuantity
    });
    render(<Cart />);
    fireEvent.click(screen.getAllByText('+')[0]);
    expect(updateCartQuantity).toHaveBeenCalledWith(1, 3); // Assuming the first item's quantity is incremented
    });
    
    it('calls removeFromCart on remove button click', () => {
    const removeFromCart = vi.fn();
    vi.mocked(useOutletContext).mockReturnValue({
    cart: mockCart,
    removeFromCart,
    updateCartQuantity: vi.fn()
    });
    render(<Cart />);
    fireEvent.click(screen.getAllByText('Remove')[0]);
    expect(removeFromCart).toHaveBeenCalledWith(1); // Assuming the first item is removed
    });
    });
