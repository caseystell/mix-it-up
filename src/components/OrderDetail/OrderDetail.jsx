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
          <>
            <h1>Order <span className="grayText">{order.orderId}</span></h1>
            <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
          </>
          :
          <h1>My Cart</h1>
        }
      </div>
      <div className="line-item-container">
        {lineItems?.length ?
          <>
            {lineItems}
            <section className="total">
              {order.isPaid ?
                <span>Total&nbsp;&nbsp;</span>
                :
                <button
                  className="btn"
                  onClick={handleCheckout}
                  disabled={!lineItems.length}
                >Checkout</button>
              }
              <span>{order.totalQty}</span>
              <span>${order.orderTotal?.toFixed(2)}</span>
            </section>
          </>
          :
          <div className="empty-cart">Your cart is empty! <span>Looking for a <Link to="/orders">previous order</Link>?</span></div>
        }
      </div>
    </div>
  );
}