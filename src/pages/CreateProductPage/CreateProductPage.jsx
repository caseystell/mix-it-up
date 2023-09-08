import './CreateProductPage.css';
import { useNavigate } from 'react-router-dom';
import AddEditProduct from '../../components/AddEditProduct/AddEditProduct';
import * as productsAPI from '../../utilities/products-api';

export default function CreateProductPage({ products, setProducts }) {

    const navigate = useNavigate();

    async function addProduct(product) {
        const newProduct = await productsAPI.createProduct(product);
        setProducts([...products, newProduct]);
    }
    
    function handleAddProduct(formData) {
        addProduct(formData);
        navigate('/products');
    }

    return (
        <AddEditProduct mode={"create"} onSubmit={handleAddProduct}/>
    );
}