import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';
import { fetchProducts } from '../src/fakeStore';

// Mock the fetchProducts function
vi.mock('../src/fakeStore', () => ({
  fetchProducts: vi.fn().mockResolvedValue([]),
}));

// Mock localStorage
const mockLocalStorage = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('App Component', () => {
    beforeEach(() => {
    // Clear mock implementations and localStorage before each test
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation')).toBeTruthy();
  });

  it('initializes the cart from localStorage', () => {
    const mockCart = [{ id: '1', quantity: 2 }];
    window.localStorage.setItem('cart', JSON.stringify(mockCart));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it('calls fetchProducts on mount', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(fetchProducts).toHaveBeenCalled();
  });
});
