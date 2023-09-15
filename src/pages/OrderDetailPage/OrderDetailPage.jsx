import './OrderDetailPage.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LineItem from '../../components/LineItem/LineItem';
import * as ordersAPI from '../../utilities/orders-api';

export default function OrderDetailPage({  }) {

  const [order, setOrder] = useState();
  const navigate = useNavigate();
  let {orderId} = useParams();

  useEffect(function() {
    async function getOrderById(id) {
      const order = await ordersAPI.getById(id);
      setOrder(order);
    }
    getOrderById(orderId);
  }, [orderId]);

  if (!order) return null;

  const lineItems = order.lineItems?.map(product =>
    <LineItem
      lineItem={product}
      isPaid={order.isPaid}
      key={product._id}
    />
  );

  return (
    
    <div className="OrderDetail">
    { order.isPaid &&
        <>
        <div className="order-heading">
            <h2>Order <span className="grayText">{order.orderId}</span></h2>
            <span className="date">{new Date(order.updatedAt).toLocaleDateString()}</span>
        </div>
        <table>
            <thead>
            <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {lineItems}
            </tbody>
            <tfoot className="total">
            <tr>
                <td>Total</td>
                <td>{order.totalQty} Items</td>
                <td>${order.orderTotal?.toFixed(2)}</td>
            </tr>
            </tfoot>
        </table>
        </>
    }
    </div>
  );
} 