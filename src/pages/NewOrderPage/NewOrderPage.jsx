import { useState, useEffect, useRef } from 'react';
import * as productsAPI from '../../utilities/products-api';
import * as ordersAPI from '../../utilities/orders-api';
import './NewOrderPage.css';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage';

export default function NewOrderPage({ products, setProducts }) {
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();

  // The empty dependency array causes the effect
  // to run ONLY after the FIRST render
  useEffect(function() {
    async function getProducts() {
      const products = await productsAPI.getAll();
      categoriesRef.current = [...new Set(products.map(product => product.category.name))];
      setProducts(products);
      setActiveCat(categoriesRef.current[0]);
    }
    getProducts();
    // Cart
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);

  /*--- Event Handlers --- */
  async function handleAddToOrder(productId) {
    const updatedCart = await ordersAPI.addProductToCart(productId);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }

  return (
    <main className="NewOrderPage">
      <aside>
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <Link to="/orders" className="button btn-sm">Order History</Link>
      </aside>
      <ProductDetailPage handleAddToOrder={handleAddToOrder}/>
      <OrderDetail order={cart} handleCheckout={handleCheckout} />
    </main>
  );
}