import { Product } from './Product';

const ProductList = ({ products, addToCart }) => {
  if (!products || products.length === 0) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h1 className='shopTitle'>Products</h1>
      <div className="products">
        {products.map(product => (
          <Product 
            key={product.id} 
            data={product} 
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
