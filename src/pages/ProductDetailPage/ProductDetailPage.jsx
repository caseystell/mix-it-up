import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as productsAPI from '../../utilities/products-api';

export default function ProductDetailPage({ products, setProducts, handleAddToOrder }) {
    let {productId} = useParams();
    console.log(`What are my products? ${products}`);

    let product = products.find((prod) => prod._id === productId);
    console.log(`What is my product? ${product}`);


    useEffect(function() {
        async function getProductById(id) {
          const product = await productsAPI.getById(id);
          setProducts(product);
        }
        getProductById(productId);
    }, [productId]);
    
    return (
        <div className="ProductDetail">
            {product ? (
                <>
                    Listed {new Date(product.createdAt).toLocaleDateString()}
                    <img src={product.img} alt="product"/>
                    {/* Seller: {product.seller.name} */}
                    <h2>{product.title}</h2>
                    ${product.price.toFixed(2)}
                    <button className="btn" onClick={() => handleAddToOrder(productId)}>Add to Cart</button>
                    Condition: {product.condition}
                    Description: {product.description}
                    <button className="btn" >Edit Product</button>
                    <button className="btn" >Delete Product</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}