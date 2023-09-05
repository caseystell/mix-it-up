import { useState, useEffect } from 'react';
import * as productsAPI from '../../utilities/products-api';

export default function CreateProductPage({ addProduct, setProducts }) {
    const [formData, setFormData] = useState({})

    function handleChange(evt) {
        const newFormData = {...formData, [evt.target.name]: evt.target.value };
        setFormData(newFormData);
    }
    
    function handleAddProduct(evt) {
        evt.preventDefault();
        addProduct(formData);
    }
    
    useEffect(function() {
        async function getProducts() {
          const products = await productsAPI.getAll();
          setProducts(products);
        }
        getProducts();
    }, []);

    return (
        <form className="NewProductForm" onSubmit={handleAddProduct}>
            <label>Title</label>
            <input 
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
            />
            <button type="submit">List Product</button>
      </form>
    );
  }