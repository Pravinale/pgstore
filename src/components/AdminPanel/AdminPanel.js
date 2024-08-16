import React, { useContext } from 'react';
import Cart from '../../pages/Cart/Cart'
import { CartContext } from '../../contexts/showCartContext';
import './Adminpanel.css'
import USERSDATA from '../../USERDATA';

const AdminPanel = () => {

    const { showCart } = useContext(CartContext);

    return (
        <>
        <div className='admin-container'>
            <form className='admin-form'>
            <div className='form-body'>
                    <div className='product-content'>
                                <h3>Product Name</h3>
                                <input type="text" name="title" placeholder="Title"  required />
                    </div>
                    <div className='product-content'>
                                <h3>Image</h3>
                                <input type="text" name="image" placeholder="Image URL"  required />
                    </div>
                    <div className='product-content'>
                                <h3>Category</h3>
                                <input type="text" name="category" placeholder="Category"  required />
                    </div>
                    <div className='product-content'>
                                <h3>Price</h3>
                                <input type="number" name="price" placeholder="Price"  required />
                    </div>
                    <div className='product-content'>
                                <h3>Stock</h3>
                                <input type="number" name="stock" placeholder="Stock" required />
                    </div>
                    <div className='product-content'>
                                <h3>Description</h3>
                                <textarea name="desc" placeholder="Description..."  required></textarea>
                    </div>
            </div>
            <button type="submit">Add Product</button>
            </form>

            <div className='user-details'>
                <h1>User Details</h1>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Number</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {USERSDATA.map((user) => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.number}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>

        <div className={`cartPage ${showCart ? 'visible' : 'hidden'}`}>
        <Cart />
        </div>
        </>
    );
};

export default AdminPanel;
