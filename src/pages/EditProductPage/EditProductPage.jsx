import './EditProductPage.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddEditProduct from '../../components/AddEditProduct/AddEditProduct';
import * as productsAPI from '../../utilities/products-api';

export default function EditProductPage({ products, setProducts }) {
    const [product, setProduct] = useState(null);
    let {productId} = useParams();
    const navigate = useNavigate();

    useEffect(function() {
        async function getProductById(id) {
          const product = await productsAPI.getById(id);
          setProduct(product);
        }
        getProductById(productId);
    }, [productId]);

    async function editProduct(productId, product) {
        const editedProduct = await productsAPI.editProduct(productId, product);
        setProduct(editedProduct);
    }

    function handleEditProduct(formData) {
        editProduct(productId, formData);
        navigate(`/products/${productId}`);
    }

    return (
        <>
            { product && (<AddEditProduct mode={"edit"} initialState={product} onSubmit={handleEditProduct}/>) }
        </>
    );
}