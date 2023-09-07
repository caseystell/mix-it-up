import './ProductDetailPage.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as productsAPI from '../../utilities/products-api';

export default function ProductDetailPage({ handleAddToOrder, user }) {
    const [product, setProduct] = useState();
    
    let {productId} = useParams();

    useEffect(function() {
        async function getProductById(id) {
          const product = await productsAPI.getById(id);
          setProduct(product);
        }
        getProductById(productId);
    }, [productId]);
    
    return (
        <div className="productDetail">
            {product ? (
                <main className="productDetailContainer">
                    <div className="col-1">
                        <Link to="/products" className="fa fas fa-arrow-left"><span className="pinkText"> Back to all listings</span></Link>
                        <p>Listed {new Date(product.createdAt).toLocaleDateString()}</p>
                        <img className="detailImage" src={product.img} alt="product"/>
                        <p>Seller: {/* {product.user.name} */}</p>
                    </div>
                    <div className="col-2">
                        <p></p>
                        <h2>{product.title}</h2>
                        <p className="row-3"><span className="priceDetail">${product.price.toFixed(2)}</span>
                        <button className="btn addToCartBtn" onClick={() => handleAddToOrder(productId)}>Add to Cart</button></p>
                        <p className="lightGrayText">Condition: <span className="grayText" >&nbsp;{product.condition}</span></p>
                        <p className="lightGrayText">Description: <span className="grayText descripDetail">&nbsp;{product.description}</span></p>
                        { user ? (
                            <p className="editDeleteBtns"><button className="btn" >Edit Product</button>
                            <button className="btn" >Delete Product</button></p>
                        ) : (
                            <p></p>
                        )}
                        
                    </div>
                </main>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}