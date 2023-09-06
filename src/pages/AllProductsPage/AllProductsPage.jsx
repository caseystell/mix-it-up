import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import * as productsAPI from '../../utilities/products-api';

export default function AllProductsPage({ handleAddToOrder }) {
  const [products, setProducts] = useState([]);

  const productCards = products.map((product) => 
    <ProductCard
      product={product}
      key={product._id}
      handleAddToOrder={handleAddToOrder}
    />
  );

  useEffect(function() {
    async function getProducts() {
      const products = await productsAPI.getAll();
      setProducts(products);
    }
    getProducts();
  }, []); 
  
  return (
    <>
      <h1>All Products</h1>
      <ul>{productCards}</ul>
    </>
  );
}