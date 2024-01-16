import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { fetchProducts } from './fakeStore';
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (productId, addedQuantity) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === productId);
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += addedQuantity;
        return updatedCart;
      } else {
        const productToAdd = products.find(product => product.id === productId);
        return [...prevCart, { ...productToAdd, quantity: addedQuantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex(item => item.id === productId);
      if (productIndex >= 0) {
        updatedCart[productIndex].quantity = newQuantity;
      }
      return updatedCart;
    });
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar cartCount={totalItemsInCart} />
      <Outlet context={{ products, addToCart, cart, removeFromCart, updateCartQuantity }} />
    </>
  );
};

export default App;
