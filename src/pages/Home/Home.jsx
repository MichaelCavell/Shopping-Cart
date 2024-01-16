import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home">
      <div className="homeTitle">
        <h1>Please buy stuff</h1>
        <Link to="/shop">Shop</Link>
      </div>
    </div>
  );
};