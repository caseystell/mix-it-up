import { useState, useEffect } from 'react';
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
        <span className="no-orders" >No Orders Yet!</span>
      )}
    </>
  );
}