import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import * as ordersAPI from '../../utilities/orders-api';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();

  async function handleCheckout(cart, orderId) {
    const newOrder = await ordersAPI.checkout(cart);
    const orders = await ordersAPI.getAll()
    setOrderHistory([...orders, newOrder]);
    deleteOrderProductFromAllProducts(orderId)
    navigate('/orders');
  }

  async function findProductsInOrder(orderId) {
    const order = await ordersAPI.getOrder(orderId);
    console.log(`order is ${order}`);
    console.log(`orderId is ${orderId}`);
    let productIds = order?.map(lineItem => lineItem._id);
    return productIds;
  }

  async function deleteOrderProductFromAllProducts(orderId) {
    let productIds = await findProductsInOrder(orderId)
    console.log(productIds)
    await Promise.all(productIds.map(id => ordersAPI.removeSoldProduct(id)));
    setProducts(allProducts => {
        return allProducts.filter(product => !productIds.includes(product._id));
    })
  }

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/products" element={<AllProductsPage products={products} setProducts={setProducts}/>} />
              <Route path="/products/new" element={<CreateProductPage products={products} setProducts={setProducts}/>} />
              <Route path="/products/:productId" element={<ProductDetailPage user={user} setCart={setCart} setProducts={setProducts} />} />
              <Route path="/products/:productId/edit" element={<EditProductPage />} />
              <Route path="/orders" element={<OrderHistoryPage orders={orders} orderHistory={orderHistory} setOrderHistory={setOrderHistory} products={products} setProducts={setProducts} />} />
              <Route path="/orders/cart" element={<NewOrderPage cart={cart} setCart={setCart} handleCheckout={handleCheckout} />}/>
              <Route path="/*" element={<Navigate to="/products" />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
