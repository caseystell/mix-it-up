import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistoryPage.css';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import * as ordersAPI from '../../utilities/orders-api';

export default function OrderHistoryPage({ orders, orderHistory, setOrderHistory, products, setProducts, user }) {

  orders = orderHistory?.map(order => 
    <OrderDetail order={order} key={order._id} products={products} setProducts={setProducts} user={user}/>
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
      { orderHistory?.length > 0 ? ( // if I add '&& order.isPaid', stays stuck on the No orders yet! screen, even if the order is paid.
      // If I don't add '&& order.isPaid', when I have no orders, my No orders yet! only shows up on the first render and not after.
      // Maybe because unpaid orders (cart) are showing up on MongoDB under orders? That's how the cart gets saved...
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