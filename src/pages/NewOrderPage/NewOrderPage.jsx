import './NewOrderPage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ordersAPI from '../../utilities/orders-api';
import OrderDetail from '../../components/OrderDetail/OrderDetail';

export default function NewOrderPage({ cart, setCart, products, setProducts }) {
  const [orderHistory, setOrderHistory] = useState(null);
  let navigate = useNavigate();

  useEffect(function() {
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
    async function getOrderHistory() {
      const order = await ordersAPI.getAll();
      setOrderHistory(order);
    }
    getOrderHistory();
   }, []);

  async function handleRemoveQty(productId, newQty) {
    const updatedCart = await ordersAPI.setProductQtyInCart(productId, newQty);
    setCart(updatedCart)
  }

  async function handleCheckout(cart, productId) {
    const order = await ordersAPI.checkout(cart);
    setOrderHistory(order);
    handleAddToOrderHistory(order, productId);
    navigate('/orders');
  }

  async function handleAddToOrderHistory(cart, productId) {
    const order = await ordersAPI.addOrderToOrderHistory(cart);
    const products = await ordersAPI.removeSoldProduct(productId);
    setOrderHistory(order);
    setProducts(products);
  }

  return (
    <main className="NewOrderPage">
      <OrderDetail order={cart} handleRemoveQty={handleRemoveQty} handleCheckout={handleCheckout} />
    </main>
  );
}