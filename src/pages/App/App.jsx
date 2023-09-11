import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import AllProductsPage from '../AllProductsPage/AllProductsPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import CreateProductPage from '../CreateProductPage/CreateProductPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import NavBar from '../../components/NavBar/NavBar';
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage';
import EditProductPage from '../EditProductPage/EditProductPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/products" element={<AllProductsPage products={products} setProducts={setProducts}/>} />
              <Route path="/products/new" element={<CreateProductPage products={products} setProducts={setProducts}/>} />
              <Route path="/products/:productId" element={<ProductDetailPage user={user} cart={cart} setCart={setCart} products={products} setProducts={setProducts} />} />
              <Route path="/products/:productId/edit" element={<EditProductPage />} />
              <Route path="/orders" element={<OrderHistoryPage orderHistory={orderHistory} setOrderHistory={setOrderHistory} />} />
              <Route path="/orders/cart" element={<NewOrderPage cart={cart} setCart={setCart} products={products} setProducts={setProducts} orderHistory={orderHistory} setOrderHistory={setOrderHistory}/>}/>
              <Route path="/*" element={<Navigate to="/products" />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
