import { useEffect } from 'react';
import './AllProductsPage.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import * as productsAPI from '../../utilities/products-api';

export default function AllProductsPage({ products, setProducts }) {
  const productCards = products.map((product) => 
    <ProductCard
      product={product}
      key={product._id}
    />
  );

  useEffect(function() {
    async function getProducts() {
      const allProducts = await productsAPI.getAll();
      setProducts(allProducts);
    }
    getProducts();
  }, []); 
  
  return (
    <div className="allProductsPage">
      <ul>{productCards}</ul>
    </div>
  );
}