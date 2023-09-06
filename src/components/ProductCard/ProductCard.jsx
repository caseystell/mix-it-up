import { Link } from 'react-router-dom';
import ProductDetailPage from '../../pages/ProductDetailPage/ProductDetailPage';

export default function ProductCard({ product }) {
    <ProductDetailPage product={product}/>

    return (
        <Link to={`/products/${product._id}`}>
            <div
                style={{
                    "backgroundImage": `url(${product.img})`,
                    "backgroundRepeat": "no-repeat center",
                    "width": "200px",
                    "height": "200px",
                }}
            >
                <h2>{product.title}</h2>
                <p>${product.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}