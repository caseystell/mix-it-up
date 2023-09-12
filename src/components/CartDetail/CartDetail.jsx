import './CartDetail.css';
import { Link } from 'react-router-dom';
import LineItem from '../LineItem/LineItem';

export default function CartDetail({ order, handleRemoveQty, handleCheckout }) {

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
    <div className="CartDetail">
        <h1>My Cart</h1>
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
                {!order.isPaid &&
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