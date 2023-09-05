import './NewOrderPage.css';
import { Link } from 'react-router-dom';
import OrderDetail from '../../components/OrderDetail/OrderDetail';

export default function NewOrderPage({ cart, handleCheckout }) {

  return (
    <main className="NewOrderPage">
      <aside>
        <Link to="/orders" className="button btn-sm">Order History</Link>
      </aside>
      <OrderDetail order={cart} handleCheckout={handleCheckout} />
    </main>
  );
}