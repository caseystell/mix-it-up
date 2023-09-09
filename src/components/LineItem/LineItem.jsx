import './LineItem.css';

export default function LineItem({ lineItem, isPaid, handleRemoveQty }) {
  return (
    <tr className="LineItem">
      <td><img className="cart-img" src={lineItem.product.img} /></td>
      <td>{lineItem.product.title}</td>
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