import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '../src/pages/Home/Home';

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Please buy stuff')).toBeInTheDocument();
  });

  it('contains a link to the shop', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Shop')).toHaveAttribute('href', '/shop');
  });
});
