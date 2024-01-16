import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div>FakeStore.com</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </div>
    </nav>
  );
};

export default Navbar;
