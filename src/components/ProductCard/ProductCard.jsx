import { Link } from 'react-router-dom';

export default function ProductCard({ product, handleAddToOrder }) {

    return (
        <Link to={`/products/${product._id}`}>
            <div
                style={{
                    "backgroundImage": `url(${product.img})`,
                    "backgroundRepeat": "no-repeat center"
                }}
            >
                <h2>{product.title}</h2>
                <p>${product.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}