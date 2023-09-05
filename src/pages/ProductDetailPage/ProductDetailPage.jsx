import { useParams } from 'react-router-dom';

export default function ProductDetailPage({ products, handleAddToOrder }) {
    let {productId} = useParams();
    let product = products.find(prod => prod._id === productId);
    
    return (
        <>
            Listed {new Date(product.createdAt).toLocaleDateString()}
            {product.img}
            Seller: {product.user.username}
            <h2>{product.title}</h2>
            ${product.price.toFixed(2)}
            <button onClick={() => handleAddToOrder(productId)}>Add to Cart</button>
            Condition: {product.condition}
            Description: {product.description}
        </>
    );
}