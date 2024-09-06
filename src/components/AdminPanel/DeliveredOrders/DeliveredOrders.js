


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './DeliveredOrders.css';

const DeliveredOrders = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders`);
        const allOrders = response.data;

        // Filter orders where deliveryStatus is 'completed'
        const completedOrders = allOrders.filter(order => order.deliveryStatus === 'completed');

        // Sort completed orders by purchaseDate in descending order
        const sortedOrders = completedOrders.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="delivered-orders-container">
      <button onClick={() => navigate(-1)} className="back-button">Back</button> {/* Back button */}
      <h2>Delivered Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Price</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.username}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.status}</td>
                <td>{order.deliveryStatus}</td>
                <td>{order.price}</td>
                <td>
                  <ul>
                    {order.products.map(product => (
                      <li key={product.productId}>
                        {product.productId} (Qty: {product.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No delivered orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveredOrders;
