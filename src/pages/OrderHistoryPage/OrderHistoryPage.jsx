import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistoryPage.css';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import * as ordersAPI from '../../utilities/orders-api';

export default function OrderHistoryPage({ orderHistory, setOrderHistory }) {

  const orders = orderHistory?.map(order => 
    <OrderDetail order={order}/>
  )

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
      { orderHistory?.length > 0 ? (
        <div>{orders}</div>
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