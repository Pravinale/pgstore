import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OtherPaymentOrders.css';

const OtherPaymentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders`);
        const otherPaymentOrders = response.data.filter(order => order.paymentMethod !== 'Cash in hand');

        // Sort otherPaymentOrders by purchaseDate in descending order
        const sortedOrders = otherPaymentOrders.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

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
      <h1>Online Payment Orders</h1>
      
      <input
        type="text"
        placeholder="Search by order ID or username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-input'
      />
      
      {filteredOrders.length === 0 ? (
        <p>No orders with other payment methods found.</p>
      ) : (
        <table className='orders-table'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Username</th>
              <th>Total Price</th>
              <th>Products</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.username}</td>
                <td>Rs.{order.price}</td>
                <td>
                  {order.products.map(product => (
                    <div key={product.productId}>
                      <p>{product.name} (Qty: {product.quantity})</p>
                    </div>
                  ))}
                </td>
                <td>{order.paymentMethod}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OtherPaymentOrders;
