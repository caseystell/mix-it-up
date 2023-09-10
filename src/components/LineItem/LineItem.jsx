import './LineItem.css';
import { Link } from 'react-router-dom';

export default function LineItem({ lineItem, isPaid, handleRemoveQty }) {
  return (
    <tr className="LineItem">
      <td><Link to={`/products/${lineItem.product._id}`}><img className="cart-img" src={lineItem.product.img} /></Link></td>
      <td className="no-link"><Link to={`/products/${lineItem.product._id}`} style={{ "color": "#1E1E1E" }}>{lineItem.product.title}</Link></td>
      <td className="price">${lineItem.product.price.toFixed(2)}</td>
        {!isPaid &&
          <td><button
            className="btn"
            onClick={() => handleRemoveQty(lineItem.product._id, lineItem.qty - 1)}
          >x</button></td>
        }
    </tr>
  );
}