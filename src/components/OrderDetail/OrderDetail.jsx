import './OrderDetail.css';
import LineItem from '../LineItem/LineItem';

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderDetail({ order, handleRemoveQty, handleCheckout }) {
  if (!order) return null;

  const lineItems = order.lineItems.map(product =>
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
          <span>Order <span className="smaller">{order.orderId}</span></span>
          :
          <span>New Order</span>
        }
        <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="line-item-container">
        {lineItems.length ?
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
              <span>${order.orderTotal.toFixed(2)}</span>
            </section>
          </>
          :
          <div className="empty-cart">Your cart is empty!</div>
        }
      </div>
    </div>
  );
}