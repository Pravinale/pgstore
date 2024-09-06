import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useUserProfile from '../../../hooks/useUserProfile';
import { useNavigate } from 'react-router-dom';
import './MyOrders.css';

const MyOrders = () => {
    const { userProfile, loading, error } = useUserProfile();
    const [orders, setOrders] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (userProfile) {
                try {
                    const response = await axios.get(`${BASE_URL}/orders/${userProfile._id}`);
                    // Sort orders by purchaseDate in descending order
                    const sortedOrders = response.data.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
                    setOrders(sortedOrders);
                } catch (err) {
                    console.error('Error fetching orders:', err);
                }
            }
        };
        fetchOrders();
    }, [userProfile, BASE_URL]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Filter orders to show only those with "completed" payment status
    const completedOrders = orders.filter(order => order.status === 'completed');

    return (
        <div className='my-orders-container'>
            <button onClick={() => navigate(-1)} className='back-button'>Back</button>
            <h1>My Orders</h1>
            {completedOrders.length === 0 ? (
                <p>No completed orders found.</p>
            ) : (
                <ul>
                    {completedOrders.map((order) => (
                        <li key={order._id} className='order-item'>
                            <h2>Order ID: {order.orderId}</h2>
                            <p>Username: {order.username}</p>
                            <p>Total Price: Rs.{order.price}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <p>Payment Status: {order.status}</p>
                            <h3>Products:</h3>
                            <ul>
                                {order.products.map((product) => (
                                    <li key={product.productId}>
                                        {product.name} - Qty: {product.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyOrders;
