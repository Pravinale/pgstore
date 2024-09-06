

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './OnGoingDelivery.css';

const OnGoingDelivery = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newDeliveryStatus, setNewDeliveryStatus] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await axios.get(`${BASE_URL}/orders`);
        const allOrders = ordersResponse.data;

        // Filter orders based on payment method and status
        const filteredOrders = allOrders.filter(order => {
          // Exclude orders with completed deliveryStatus only if paymentStatus is also completed
          if (order.deliveryStatus === 'completed' && order.status === 'completed') {
            return false;
          }

          // Include all Cash in hand orders
          if (order.paymentMethod === 'Cash in hand') {
            return true;
          }

          // Include only completed orders for other payment methods
          return order.status === 'completed';
        });

        // Sort orders by purchaseDate in descending order
        const sortedOrders = filteredOrders.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

        setOrders(sortedOrders);

        // Fetch product details for all orders
        const productIds = sortedOrders.flatMap(order => order.products.map(p => p.productId));
        const uniqueProductIds = [...new Set(productIds)];

        const productsResponse = await axios.get(`${BASE_URL}/products`, {
          params: { ids: uniqueProductIds }
        });

        const products = productsResponse.data;
        const productsMap = products.reduce((acc, product) => {
          acc[product._id] = product;
          return acc;
        }, {});

        setProductsMap(productsMap);
      } catch (error) {
        console.error('Error fetching orders or products:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`${BASE_URL}/orders/${orderId}`, { status, deliveryStatus: newDeliveryStatus });
      // Update local state
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status, deliveryStatus: newDeliveryStatus } : order
      ));
      setEditingOrderId(null); // Exit edit mode
      setNewDeliveryStatus('');
      setNewStatus('');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="ongoing-delivery-container">
      <button onClick={() => navigate(-1)} className="back-button">Back</button> {/* Back button */}
      <h2>Ongoing Deliveries</h2>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.orderId}</td>
              <td>{order.username}</td>
              <td>{order.paymentMethod}</td>
              <td>
                {order.paymentMethod === 'Cash in hand' && order._id === editingOrderId ? (
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td>
                {order._id === editingOrderId ? (
                  <select
                    value={newDeliveryStatus}
                    onChange={(e) => setNewDeliveryStatus(e.target.value)}
                  >
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  order.deliveryStatus
                )}
              </td>
              <td>{order.price}</td>
              <td>
                <ul>
                  {order.products.map(product => {
                    const productDetails = productsMap[product.productId];
                    return productDetails ? (
                      <li key={product.productId}>
                        {productDetails.name} (Qty: {product.quantity})
                      </li>
                    ) : (
                      <li key={product.productId}>Loading...</li>
                    );
                  })}
                </ul>
              </td>
              <td>
                {order._id !== editingOrderId ? (
                  <button onClick={() => {
                    setEditingOrderId(order._id);
                    setNewStatus(order.status);
                    setNewDeliveryStatus(order.deliveryStatus);
                  }}>
                    Edit
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleStatusChange(order._id, newStatus)}>
                      Save
                    </button>
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

export default OnGoingDelivery;
