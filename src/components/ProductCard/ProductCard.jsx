import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {

    return (
        <Link to={`/products/${product._id}`}>
            <div className="productCard"
                style={{
                    "backgroundImage": `url(${product.img})`,
                    "backgroundRepeat": "no-repeat",
                    "backgroundSize": "contain",
                }}
            >
                <div className="productCardText">
                    <h2>{product.title}</h2>
                    <p>${product.price.toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
}