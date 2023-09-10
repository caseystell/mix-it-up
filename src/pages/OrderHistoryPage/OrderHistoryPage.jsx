import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistoryPage.css';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import * as ordersAPI from '../../utilities/orders-api';

export default function OrderHistoryPage({}) {
  const [order, setOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState({});

  useEffect(function() {
    async function getOrderHistory() {
      const allOrders = await ordersAPI.getAll();
      setOrderHistory(allOrders);
    }
    getOrderHistory();
  }, []);

  return (
    <>
      <h1>My Orders</h1>
      { order ? (
        <OrderDetail orderHistory={orderHistory} setOrderHistory={setOrderHistory}/>
      ) : (
        <section className="no-orders" >
          <div>No orders yet!</div>
          <div className="fa fa-list-ul no-hover"></div>
          <div><Link to="/products">Add items</Link> to your cart!</div>
        </section>
      )}
    </>
  );
}