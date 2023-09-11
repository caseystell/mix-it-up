import './OrderDetail.css';
import { Link } from 'react-router-dom';
import LineItem from '../LineItem/LineItem';

export default function OrderDetail({ order, handleRemoveQty, handleCheckout, orderHistory, setOrderHistory }) {

  if (!order) return null;

  const lineItems = order.lineItems?.map(product =>
    <LineItem
      lineItem={product}
      isPaid={order.isPaid}
      handleRemoveQty={handleRemoveQty}
      key={product._id}
    />
  );





  return (
    <div className="OrderDetail">
      <div className="order-heading">
        {order.isPaid ?
          <Link to={`/orders/${order._id}`}>
            <h1>Order <span className="grayText">{order.orderId}</span></h1>
            <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
          </Link>
          :
          <h1>My Cart</h1>
        }
      </div>
      {!lineItems?.length ?
        <section className="empty-cart">
          <div>Your cart is empty!</div>
          <div className="fa fa-shopping-cart no-hover"></div>
          <div>Looking for a <Link to="/orders">previous order</Link>?</div>
        </section>
        :
        <>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {lineItems}
            </tbody>
            <tfoot className="total">
              <tr>
                <td></td>
                <td>{order.totalQty} Items</td>
                <td>${order.orderTotal?.toFixed(2)}</td>
                {order.isPaid ?
                  <td>Total&nbsp;&nbsp;</td>
                  :
                  <td><button
                    className="btn"
                    onClick={handleCheckout}
                    disabled={!lineItems.length}
                  >Checkout</button></td>
                }
                
              </tr>
            </tfoot>
          </table>
          <div className="gray"><Link to="/products">Back</Link> to all products</div>
        </>
        }
    </div>
  );
}