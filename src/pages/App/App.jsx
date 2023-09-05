import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import AllProductsPage from '../AllProductsPage/AllProductsPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import CreateProductPage from '../CreateProductPage/CreateProductPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import Favorites from '../Favorites/Favorites';
import NavBar from '../../components/NavBar/NavBar';
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage';
import { createProduct } from '../../utilities/products-api';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [products, setProducts] = useState([]);

  function addProduct(product) {
    setProducts([...products, product]);
    createProduct(product);
  }

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/products" element={<AllProductsPage products={products} />} />
              <Route path="/products/:id" element={<ProductDetailPage products={products} />} />
              <Route path="/products/new" element={<CreateProductPage addProduct={addProduct} />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/orders/new" element={<NewOrderPage products={products} setProducts={setProducts} />}/>
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/*" element={<Navigate to="/products" />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
