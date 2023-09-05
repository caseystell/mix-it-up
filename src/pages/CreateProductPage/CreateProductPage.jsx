import './CreateProductPage.css';
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
        <>
            <h1>List a product!</h1>
            <form className="NewProductForm" onSubmit={handleAddProduct}>
                <label className="newProductLabel h2 grayText"><h2>Photos</h2></label>
                <input className="formInput btn"
                    name="img"
                    type="file"
                    value={formData.img}
                    onChange={handleChange}
                />
                <h2 className="grayText">Product Info</h2>
                <label className="newProductLabel h4 grayText"><h4>Title</h4></label>
                <input className="formInput"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="What are you selling?"
                />
                <label className="newProductLabel h4 grayText"><h4>Description</h4></label>
                <input className="formInput"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your item! Buyers love as much detail as possible."
                />
                <label className="newProductLabel h4 grayText"><h4>Category</h4></label>
                <select className="formInput"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value={1}>1</option>
                </select>
                <label className="newProductLabel h4 grayText"><h4>Condition</h4></label>
                <select className="formInput grayText"
                    name="condition"
                    type="radio"
                    value={formData.condition}
                    onChange={handleChange}
                >
                    <option value={"New"}>New: An unopened, unused item</option>
                    <option value={"Like New"}>Like New: An unused item without original tags/packaging</option>
                    <option value={"Good"}>Good: A few minor flaws, fully functional</option>
                    <option value={"Fair"}>Fair: Multiple flaws, functional</option>
                    <option value={"Poor"}>Poor: Heavily used, may be damaged or for parts</option>
                </select>
                <label className="newProductLabel h4 grayText"><h4>Price</h4></label>
                <input className="formInput"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="$"
                />
                <br />
                <button type="submit" className="btn" >List my item!</button>
        </form>
      </>
    );
  }