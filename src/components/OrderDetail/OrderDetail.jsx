import './OrderDetail.css';
import LineItem from '../LineItem/LineItem';

export default function OrderDetail({ order }) {

  if (!order) return null;

  const lineItems = order.lineItems?.map(product =>
    <LineItem
      lineItem={product}
      isPaid={order.isPaid}
      key={product._id}
    />
  );

  return (
    <>
      {order.isPaid && 
        <div className="OrderDetail">
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
        </div>
      }
    </>
  );
} 