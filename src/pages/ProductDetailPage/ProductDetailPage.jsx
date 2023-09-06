import { useParams } from 'react-router-dom';

export default function ProductDetailPage({ products, handleAddToOrder }) {
    let {productId} = useParams();
    let product = products.find(prod => prod._id === productId);
    console.log(product);
    
    return (
        <div className="ProductDetail">
            Listed {new Date(product.createdAt).toLocaleDateString()}
            <img src={product.img} />
            Seller: {product.user.name}
            <h2>{product.title}</h2>
            ${product.price.toFixed(2)}
            <button className="btn" onClick={() => handleAddToOrder(productId)}>Add to Cart</button>
            Condition: {product.condition}
            Description: {product.description}
        </div>
    );
}