import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AddEditProduct.css';
import * as productsAPI from '../../utilities/products-api';

export default function AddEditProduct({ initialState, onSubmit, mode }) {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState(initialState);

    function handleChange(evt) {
        const newFormData = {...formData, [evt.target.name]: evt.target.value };
        setFormData(newFormData);
    }

    function wrapProduct(evt) {
        evt.preventDefault();
        onSubmit(formData);
    }

    // useEffect(function() {
    //     async function getProducts() {
    //         const products = await productsAPI.getAll();
    //         setProducts(products);
    //     }
    //     getProducts();
    // }, []);

    return (
        <div className="addProductForm">
            { mode === "create" ? (
                <h1>List a product!</h1>
            ) : (
                <h1>Edit a product!</h1>
            )
            }
            <form className="NewProductForm" onSubmit={wrapProduct}>
                <label className="newProductLabel h2 grayText"><h2>Photo URL</h2></label>
                <input className="formInput"
                    name="img"
                    type="url"
                    value={formData.img}
                    onChange={handleChange}
                    placeholder='Paste your photo URL (include "https://")'
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
                <input className="formInput descriptionInput"
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
                    <option value={"Automotive"}>Automotive</option>
                    <option value={"Baby"}>Baby</option>
                    <option value={"Books"}>Books</option>
                    <option value={"Clothing, Shoes & Accessories"}>Clothing, Shoes & Accessories</option>
                    <option value={"Collectibles"}>Collectibles</option>
                    <option value={"Electronics"}>Electronics</option>
                    <option value={"Furniture"}>Furniture</option>
                    <option value={"Health & Beauty"}>Health & Beauty</option>
                    <option value={"Home Goods & Decor"}>Home Goods & Decor</option>
                    <option value={"Home Improvement"}>Home Improvement</option>
                    <option value={"Kitchen"}>Kitchen</option>
                    <option value={"Misc"}>Misc</option>
                    <option value={"Music"}>Music</option>
                    <option value={"Office"}>Office</option>
                    <option value={"Outdoor & Garden"}>Outdoor & Garden</option>
                    <option value={"Pets"}>Pets</option>
                    <option value={"Seasonal"}>Seasonal</option>
                    <option value={"Sporting Goods"}>Sporting Goods</option>
                    <option value={"Toys & Games"}>Toys & Games</option>
                </select>
                <label className="newProductLabel h4 grayText"><h4>Condition</h4></label>
                <select className="formInput grayText"
                    name="condition"
                    type="radio"
                    value={formData.condition}
                    onChange={handleChange}
                >
                    <option value={"Select One"}>Select one</option>
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
                <div className="buttonWrapper">
                    <button type="submit" className="btn" >
                    { mode === "create" ? (
                        <span>List my item!</span>
                    ) : (
                        <span>Save my edits!</span>
                    )
                    }
                    </button>
                    <Link to="/products"><button className="btn">Cancel</button></Link>
                </div>
        </form>
      </div>
    );
}

AddEditProduct.defaultProps = { 
    initialState: {
        title: "",
        img: "",
        condition: "",
        category: "",
        description: "",
        price: 1,
    }
}