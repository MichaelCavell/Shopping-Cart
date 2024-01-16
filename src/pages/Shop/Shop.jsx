import "./Shop.css";
import ProductList from "../../components/ProductList";  
import { useOutletContext } from "react-router-dom";

const Shop = () => {
  const { products, addToCart } = useOutletContext();

  if (!products) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="shop-container">
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default Shop;
