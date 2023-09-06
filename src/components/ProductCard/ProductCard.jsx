import { Link } from 'react-router-dom';
import './ProductCard.css';
import ProductDetailPage from '../../pages/ProductDetailPage/ProductDetailPage';

export default function ProductCard({ product, products, setProducts }) {

    return (
        <>
            <Link to={`/products/${product._id}`}>
                <div className="productCard"
                    style={{
                        "backgroundImage": `url(${product.img})`,
                        "backgroundRepeat": "no-repeat center",
                        "width": "200px",
                        "height": "200px",
                    }}
                >
                    <div className="productCardText">
                        <h2>{product.title}</h2>
                        <p>${product.price.toFixed(2)}</p>
                    </div>
                </div>
            </Link>
            {/* <ProductDetailPage product={product} products={products} setProducts={setProducts}/> */}
        </>
    );
}