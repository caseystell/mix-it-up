import './NewOrderPage.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ordersAPI from '../../utilities/orders-api';
import OrderDetail from '../../components/OrderDetail/OrderDetail';

export default function NewOrderPage({}) {
  const [cart, setCart] = useState([]);
  let navigate = useNavigate();

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }

  return (
    <main className="NewOrderPage">
      <aside>
        <Link to="/orders" className="btn">Order History</Link>
      </aside>
      <OrderDetail order={cart} handleCheckout={handleCheckout} />
    </main>
  );
}