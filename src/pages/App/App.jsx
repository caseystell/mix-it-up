import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import AllProductsPage from '../AllProductsPage/AllProductsPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import CreateProductPage from '../CreateProductPage/CreateProductPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import NavBar from '../../components/NavBar/NavBar';
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage';
import * as productsAPI from '../../utilities/products-api';
import * as ordersAPI from '../../utilities/orders-api';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [products, setProducts] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState([]);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();

  // The empty dependency array causes the effect
  // to run ONLY after the FIRST render
  // useEffect(function() {
  //   async function getProducts() {
  //     const products = await productsAPI.getAll();
  //     categoriesRef.current = [...new Set(products.map(product => product.category.name))];
  //     setProducts(products);
  //     setActiveCat(categoriesRef.current[0]);
  //   }
  //   getProducts();
  //   // Cart
  //   async function getCart() {
  //     const cart = await ordersAPI.getCart();
  //     setCart(cart);
  //   }
  //   getCart();
  // }, []);

  /*--- Event Handlers --- */
  async function handleAddToOrder(productId) {
    const updatedCart = await ordersAPI.addProductToCart(productId);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }

  function addProduct(product) {
    setProducts([...products, product]);
    productsAPI.createProduct(product);
  }

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} activeCat={activeCat} setActiveCat={setActiveCat} categoriesRef={categoriesRef}/>
            <Routes>
              {/* Route components in here */}
              <Route path="/products" element={<AllProductsPage />} />
              <Route path="/products/new" element={<CreateProductPage addProduct={addProduct} setProducts={setProducts}/>} />
              <Route path="/products/:productId" element={<ProductDetailPage user={user} handleAddToOrder={handleAddToOrder} />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/orders/new" element={<NewOrderPage cart={cart} handleCheckout={handleCheckout} />}/>
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/*" element={<Navigate to="/products" />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
