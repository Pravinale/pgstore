import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Adminpanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]); // State to store categories
    const [newCategory, setNewCategory] = useState(''); // State for new category input
    const [productData, setProductData] = useState({
        title: '',
        category: '',
        price: '',
        stock: '',
        desc: '',
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const BASE_URL = process.env.REACT_APP_BASE_URL; // Access the base URL from the .env file

    useEffect(() => {
        // Fetch users and categories
        axios.get(`${BASE_URL}/users`)
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users data:', error));
        
        axios.get(`${BASE_URL}/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, [BASE_URL]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setProductData(prevData => ({
            ...prevData,
            category: e.target.value
        }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', productData.title);
        formData.append('category', productData.category);
        formData.append('price', productData.price);
        formData.append('stock', productData.stock);
        formData.append('desc', productData.desc);
        if (image) {
            formData.append('image', image);
        }

        axios.post(`${BASE_URL}/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log('Product added successfully:', response.data);
                setProductData({
                    title: '',
                    category: '',
                    price: '',
                    stock: '',
                    desc: '',
                });
                setImage(null);
                alert('Product added successfully');
            })
            .catch(error => console.error('Error adding product:', error));
    };

    const handleAddCategory = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/categories`, { name: newCategory })
            .then(response => {
                setCategories([...categories, response.data]);
                setNewCategory(''); // Clear input field
                alert('Category added successfully');
            })
            .catch(error => console.error('Error adding category:', error));
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            axios.delete(`${BASE_URL}/categories/${id}`)
                .then(response => {
                    setCategories(categories.filter(category => category._id !== id));
                    alert('Category deleted successfully');
                })
                .catch(error => console.error('Error deleting category:', error));
        }
    };

    return (
        <div className='admin-container'>
            <button onClick={() => navigate(-1)} className='back-button'>Back</button>
            <h1>Admin Panel</h1>

            <div className='admin-sub-container'>
                <div className='Details-container'>
                    <h1>Details</h1>
                    <ul>
                        <li><Link to='/allproducts'>All Products</Link></li>
                        <li><Link to='/outofstock'>Out Of Stock</Link></li>
                        <li><Link to='/alladmins'>Admin Details</Link></li>
                        <li><Link to='/allusers'>User Details</Link></li>
                    </ul>
                    <ul>
                        <li><Link to='/orders'>All Orders</Link></li>
                        <li><Link to='/cashinhandorders'>Cash payment order</Link></li>
                        <li><Link to='/onlineorders'>Online payment Orders</Link></li>
                    </ul>
                    <ul>
                        <li><Link to='/ongoingdelivery'>On Going Delivery</Link></li>
                        <li><Link to='/deliveredorders'>Delivered Orders</Link></li>
                    </ul>
                </div>
                <form className='admin-form' onSubmit={handleAddProduct}>
                    <div className='form-body'>
                        <div className='product-content'>
                            <h3>Product Name</h3>
                            <input type="text" name="title" value={productData.title} onChange={handleInputChange} placeholder="Title" required />
                        </div>
                        <div className='product-content'>
                            <h3>Image</h3>
                            <input type="file" onChange={handleImageChange} required />
                        </div>
                        <div className='product-content'>
                            <h3>Category</h3>
                            <select name="category" value={productData.category} onChange={handleCategoryChange}>
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='product-content'>
                            <h3>Price</h3>
                            <input type="number" name="price" value={productData.price} onChange={handleInputChange} placeholder="Price" required />
                        </div>
                        <div className='product-content'>
                            <h3>Stock</h3>
                            <input type="number" name="stock" value={productData.stock} onChange={handleInputChange} placeholder="Stock" required />
                        </div>
                        <div className='product-content'>
                            <h3>Description</h3>
                            <textarea name="desc" value={productData.desc} onChange={handleInputChange} placeholder="Description..." required></textarea>
                        </div>
                    </div>
                    <button type="submit">Add Product</button>
                </form>
                <form className='category-form' onSubmit={handleAddCategory}>
                    <h2>Add New Category</h2>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New Category"
                        required
                    />
                    <button type="submit">Add Category</button>

                    <div className='category-list'>
                        <h2>Existing Categories</h2>
                        <ul>
                            {categories.map(cat => (
                                <li key={cat._id}>
                                  <div className='category-delete'>
                                    <h1>{cat.name}</h1>
                                    <h3 onClick={() => handleDeleteCategory(cat._id)}>x</h3>
                                  </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AdminPanel;

