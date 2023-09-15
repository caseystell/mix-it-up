import { Link } from 'react-router-dom';
import './OrderCard.css';

export default function OrderCard({ order }) {

  if (!order) return null;

    return (
        <Link to={`/orders/${order._id}`}>
            {order.isPaid && 
                <div className="OrderCard">
                    <div className="order-heading">
                        <h2>Order <span className="grayText">{order.orderId}</span></h2>
                        <span className="date">{new Date(order.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="card-total">
                        <span>Total</span>
                        <span>{order.totalQty} Items</span>
                        <span>${order.orderTotal?.toFixed(2)}</span>
                    </div>
                </div>
            }
        </Link>
    );
}