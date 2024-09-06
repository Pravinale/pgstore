import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Outofstuck.css';

const Outofstuck = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [outOfStockProducts, setOutOfStockProducts] = useState([]);
    const [editableProductId, setEditableProductId] = useState(null);
    const [editProductData, setEditProductData] = useState({
        title: '',
        image: '',
        category: '',
        price: '',
        stock: '',
        desc: ''
    });
    const [imageFile, setImageFile] = useState(null); // State for image file
    const [categories, setCategories] = useState([]); // State for categories
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch all products data from the server
        axios.get(`${BASE_URL}/products`)
            .then(response => {
                const allProducts = response.data;
                // Filter out-of-stock products
                const outOfStock = allProducts.filter(product => product.stock === 0);
                setOutOfStockProducts(outOfStock);
            })
            .catch(error => console.error('Error fetching products data:', error));

        // Fetch all categories data from the server
        axios.get(`${BASE_URL}/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleEditClick = (product) => {
        setEditableProductId(product._id);
        setEditProductData({
            title: product.title,
            image: product.image,
            category: product.category,
            price: product.price,
            stock: product.stock,
            desc: product.desc
        });
        setImageFile(null); // Reset the image file
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Set the selected image file
    };

    const handleUpdate = () => {
        if (!editableProductId) return;

        // Update product details
        axios.put(`${BASE_URL}/products/${editableProductId}`, editProductData)
            .then(response => {
                setOutOfStockProducts(prevProducts =>
                    prevProducts.map(product =>
                        product._id === editableProductId ? response.data : product
                    )
                );
                setEditableProductId(null);
                setEditProductData({
                    title: '',
                    image: '',
                    category: '',
                    price: '',
                    stock: '',
                    desc: ''
                });
                alert('Product updated successfully');
            })
            .catch(error => {
                console.error('Error updating product:', error.response ? error.response.data : error.message);
                alert('Failed to update product. Please try again.');
            });

        // If a new image file is selected, handle old image deletion and update the new image
        if (imageFile) {
            // First delete the old image
            axios.delete(`${BASE_URL}/products/${editableProductId}/image`)
                .then(() => {
                    // Then upload the new image
                    const formData = new FormData();
                    formData.append('image', imageFile);

                    axios.put(`${BASE_URL}/products/${editableProductId}/image`, formData)
                        .then(response => {
                            setOutOfStockProducts(prevProducts =>
                                prevProducts.map(product =>
                                    product._id === editableProductId ? response.data : product
                                )
                            );
                            setEditableProductId(null);
                            setEditProductData({
                                title: '',
                                image: '',
                                category: '',
                                price: '',
                                stock: '',
                                desc: ''
                            });
                            setImageFile(null); // Reset the image file
                            alert('Image updated successfully');
                        })
                        .catch(error => {
                            console.error('Error updating image:', error.response ? error.response.data : error.message);
                            alert('Failed to update image. Please try again.');
                        });
                })
                .catch(error => {
                    console.error('Error deleting old image:', error.response ? error.response.data : error.message);
                    alert('Failed to delete old image. Please try again.');
                });
        }
    };

    return (
        <div className='Outofstuck-container'>
            <button onClick={() => navigate(-1)} className='back-button'>
                Back
            </button>
            <h1>Out of Stock Products</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {outOfStockProducts.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>
                                {editableProductId === product._id ? (
                                    <>
                                        <input 
                                            type="file" 
                                            name="image" 
                                            onChange={handleImageChange} 
                                        />
                                        {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: '100px', height: 'auto' }} />}
                                    </>
                                ) : (
                                    <img src={`${BASE_URL}/${product.image}`} alt={product.title} style={{ width: '100px', height: 'auto' }} />
                                )}
                            </td>
                            <td>
                                {editableProductId === product._id ? (
                                    <input 
                                        type="text" 
                                        name="title" 
                                        value={editProductData.title} 
                                        onChange={handleInputChange} 
                                    />
                                ) : (
                                    product.title
                                )}
                            </td>
                            <td>
                                {editableProductId === product._id ? (
                                    <select 
                                        name="category" 
                                        value={editProductData.category} 
                                        onChange={handleInputChange}
                                    >
                                        {categories.map(category => (
                                            <option key={category._id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    product.category
                                )}
                            </td>
                            <td>
                                {editableProductId === product._id ? (
                                    <input 
                                        type="number" 
                                        name="price" 
                                        value={editProductData.price} 
                                        onChange={handleInputChange} 
                                    />
                                ) : (
                                    `Rs.${product.price.toFixed(2)}`
                                )}
                            </td>
                            <td>
                                {editableProductId === product._id ? (
                                    <input 
                                        type="number" 
                                        name="stock" 
                                        value={editProductData.stock} 
                                        onChange={handleInputChange} 
                                    />
                                ) : (
                                    product.stock
                                )}
                            </td>
                            <td>
                                {editableProductId === product._id ? (
                                    <textarea 
                                        name="desc" 
                                        value={editProductData.desc} 
                                        onChange={handleInputChange} 
                                    />
                                ) : (
                                    product.desc
                                )}
                            </td>
                            <td>
                                {editableProductId === product._id ? (
                                    <button onClick={handleUpdate}>Update</button>
                                ) : (
                                    <button onClick={() => handleEditClick(product)}>Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Outofstuck;

