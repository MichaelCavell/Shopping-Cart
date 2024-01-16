import { useState } from 'react';

export const Product = ({ data, addToCart, cartItemCount }) => {
  const { id, title, price, image } = data;
  const [quantity, setQuantity] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(0, parseInt(e.target.value, 10) || 0);
    setQuantity(newQuantity);
  };

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
    addToCart(id, quantity);
    setFeedbackMessage('Added to cart!'); // Set feedback message
    setQuantity(0);
    setTimeout(() => setFeedbackMessage(''), 2000);
    }
  };

  return (
    <div className="product">
      <img src={image} alt={title} />
      <div className="description">
        <p><b>{title}</b></p>
      </div>
      <p>${price.toFixed(2)}</p>
      <div className="quantity-controls">
        <button onClick={decrement}>-</button>
        <input type="number" value={quantity} onChange={handleQuantityChange} />
        <button onClick={increment}>+</button>
      </div>
      <button className="addToCartBttn" onClick={handleAddToCart}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
      {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
    </div>
  );
};
