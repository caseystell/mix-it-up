import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import EditProductPage from '../EditProductPage/EditProductPage';
import * as productsAPI from '../../utilities/products-api';
import * as ordersAPI from '../../utilities/orders-api';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // The empty dependency array causes the effect
  // to run ONLY after the FIRST render
  // useEffect(function() {
  //   async function getProducts() {
  //     const products = await productsAPI.getAll();
  //     categoriesRef.current = [...new Set(products.map(product => product.category.name))];
  //     setProducts(products);
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

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/products" element={<AllProductsPage products={products} setProducts={setProducts}/>} />
              <Route path="/products/new" element={<CreateProductPage products={products} setProducts={setProducts}/>} />
              <Route path="/products/:productId" element={<ProductDetailPage user={user} cart={cart} setCart={setCart}/>} />
              <Route path="/products/:productId/edit" element={<EditProductPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/orders/new" element={<NewOrderPage />}/>
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
