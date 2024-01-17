import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar';

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Navbar cartCount={0} />
      </BrowserRouter>
    );
    expect(screen.getByText('FakeStore.com')).toBeInTheDocument();
  });

  it('contains the correct links', () => {
    render(
      <BrowserRouter>
        <Navbar cartCount={0} />
      </BrowserRouter>
    );
    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getByText('Shop')).toHaveAttribute('href', '/shop');
    expect(screen.getByText('Cart (0)')).toHaveAttribute('href', '/cart');
  });

  it('displays the correct cart count', () => {
    const cartCount = 5;
    render(
      <BrowserRouter>
        <Navbar cartCount={cartCount} />
      </BrowserRouter>
    );
    expect(screen.getByText(`Cart (${cartCount})`)).toBeInTheDocument();
  });
});
