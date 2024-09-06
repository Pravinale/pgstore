import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Allproducts.css';

const Allproducts = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // State to store categories
    const [editableProductId, setEditableProductId] = useState(null);
    const [editProductData, setEditProductData] = useState({
        title: '',
        image: '',
        category: '',
        price: '',
        stock: '',
        desc: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [searchCategory, setSearchCategory] = useState(''); // State for search term
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products
        axios.get(`${BASE_URL}/products`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products data:', error));

        // Fetch categories
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
        setImageFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleUpdate = () => {
        if (!editableProductId) return;

        if (imageFile) {
            axios.delete(`${BASE_URL}/products/${editableProductId}/image`)
                .then(() => {
                    const formData = new FormData();
                    formData.append('image', imageFile);

                    return axios.put(`${BASE_URL}/products/${editableProductId}/image`, formData);
                })
                .then(response => {
                    setProducts(prevProducts =>
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
                    setImageFile(null);
                    alert('Image updated successfully');
                })
                .catch(error => {
                    console.error('Error updating image:', error.response ? error.response.data : error.message);
                    alert('Failed to update image. Please try again.');
                });
        } else {
            axios.put(`${BASE_URL}/products/${editableProductId}`, editProductData)
                .then(response => {
                    setProducts(prevProducts =>
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
        }
    };

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`${BASE_URL}/products/${productId}`)
                .then(() => {
                    setProducts(prevProducts =>
                        prevProducts.filter(product => product._id !== productId)
                    );
                    alert('Product deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting product:', error.response ? error.response.data : error.message);
                    alert('Failed to delete product. Please try again.');
                });
        }
    };

    // Filter products based on search category
    const filteredProducts = products.filter(product =>
        product.category.toLowerCase().includes(searchCategory.toLowerCase())
    );

    return (
        <div className='allProduct-container'>
            <button onClick={() => navigate(-1)} className='back-button'>
                Back
            </button>
            <h1>All Products</h1>

            <input
                type="text"
                placeholder="Search by category"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className='search-input'
            />

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
                    {filteredProducts.map(product => (
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
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat.name}>{cat.name}</option>
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
                                    <>
                                        <button onClick={handleUpdate}>Update</button>
                                    </>
                                ) : (
                                    <>
                                        <div className='edit-delete'>
                                            <button onClick={() => handleEditClick(product)}>Edit</button>
                                            <button onClick={() => handleDelete(product._id)}><span>Delete</span></button>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Allproducts;





