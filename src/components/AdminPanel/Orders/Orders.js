import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders`);
        const sortedOrders = response.data.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
        setOrders(sortedOrders);
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderId.toString().includes(searchTerm)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='orders-container'>
      <button onClick={() => navigate(-1)} className='back-button'>Back</button>
      <h1>Order List</h1>

      <input
        type="text"
        placeholder="Search by username or order ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-input'
      />

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className='orders-list'>
          {filteredOrders.map(order => (
            <div key={order.orderId} className='order-card'>
              <h2>Order ID: {order.orderId}</h2>
              <p><strong>Username:</strong> {order.username}</p>
              <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Total Price:</strong> Rs.{order.price}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Payment Status:</strong> {order.status}</p>

              <div className='products-list'>
                <h3>Products:</h3>
                {order.products.map(product => (
                  <div key={product.productId} className='productCard'>
                    <img src={`${BASE_URL}/${product.image}`} alt={product.name} className='product-image' />
                    <p><strong>{product.name}</strong> (Qty: {product.quantity})</p>
                    <p>{product.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
