import { useOutletContext } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useOutletContext();

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  if (cart.length === 0) {
    return <h1>Your cart is empty</h1>;
  }

  return (
    <div>
      <h1 className="cartTitle">Your Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="description">
              <h3>{item.title}</h3>
            </div>
            <div className="itemTotals">
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p> {/* Total for each item */}
            </div>
            <div className="quantity-controls">
              <button onClick={() => updateCartQuantity(item.id, Math.max(item.quantity - 1, 1))} className="minus">-</button>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="plus">+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="removeFromCart">Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: ${calculateTotal(cart).toFixed(2)}</h3>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
