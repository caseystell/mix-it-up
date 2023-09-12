import './ProductDetailPage.css';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as productsAPI from '../../utilities/products-api';
import * as ordersAPI from '../../utilities/orders-api';

export default function ProductDetailPage({ setProducts, user, setCart }) {
    const [product, setProduct] = useState();
    const navigate = useNavigate();
    let {productId} = useParams();

    useEffect(function() {
        async function getProductById(id) {
          const product = await productsAPI.getById(id);
          setProduct(product);
        }
        getProductById(productId);
    }, [productId]);

    function handleDeleteProduct(evt) {
        evt.preventDefault();
        deleteProduct(productId);
        navigate('/products');
    }
    
    async function deleteProduct(productId) {
        await productsAPI.deleteProduct(productId);
        setProducts(allProducts => {
            return allProducts.filter(product => product._id !== productId);
        })
    }

    async function handleAddToOrder(productId) {
        const updatedCart = await ordersAPI.addProductToCart(productId);
        setCart(updatedCart);
    }
    
    return (
        <div className="productDetail">
            {product ? (
                <main className="productDetailContainer">
                    <div className="col-1">
                        <Link to="/products" className="fa fas fa-arrow-left"><span className="pinkText"> Back to all listings</span></Link>
                        <p>Listed {new Date(product.createdAt).toLocaleDateString()}</p>
                        <img className="detailImage" src={product.img} alt="product"/>
                        <p>Seller ID: {product.user.slice(-6).toUpperCase()}</p>
                    </div>
                    <div className="col-2">
                        <p></p>
                        <h2>{product.title}</h2>
                        <p className="row-3"><span className="priceDetail">${product.price.toFixed(2)}</span></p>
                        <p className="lightGrayText">Condition: <span className="grayText" >&nbsp;{product.condition}</span></p>
                        <p className="lightGrayText">Description: <span className="grayText descripDetail">&nbsp;{product.description}</span></p>
                        { user?._id === product.user ? (
                            <span className="editDeleteBtns"><Link to={`/products/${productId}/edit`}><button className="btn" >Edit Product</button></Link>
                                <form className="deleteForm" onSubmit={handleDeleteProduct}>
                                    <button className="btn" type="submit" >Delete Product</button>
                                </form>
                            </span>
                        ) : ( 
                            <Link to="/orders/cart"><button className="btn addToCartBtn" onClick={() => handleAddToOrder(productId)}>Add to Cart</button></Link>
                        )}
                    </div>
                </main>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}