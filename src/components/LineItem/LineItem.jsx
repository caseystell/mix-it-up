import './LineItem.css';

export default function LineItem({ lineItem, isPaid, handleRemoveQty }) {
  return (
    <div className="LineItem">
      <span>{lineItem.product.title}</span>
      <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
        {!isPaid &&
          <button
            className="btn"
            onClick={() => handleRemoveQty(lineItem.product._id, lineItem.qty - 1)}
          >Remove</button>
        }
      </div>
      <div className="price">${lineItem.product.price.toFixed(2)}</div>
    </div>
  );
}