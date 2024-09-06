import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserProfile from '../../hooks/useUserProfile';
import axios from 'axios';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import './Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, grandTotal } = location.state || { cartItems: [], grandTotal: 0 };
    const { userProfile, loading, error } = useUserProfile();
    const { clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [items, setItems] = useState(cartItems);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [latestOrderId, setLatestOrderId] = useState(null);

    const placeOrder = async (paymentMethod) => {
        try {
            const orderId = `order-${Date.now()}`;
            const orderDetails = {
                orderId,
                userId: userProfile._id,
                username: userProfile.username,
                phoneNumber: userProfile.phonenumber, // Pass phone number
                email: userProfile.email,             // Pass email
                address: userProfile.address,         // Pass address
                products: items.map(item => ({
                    productId: item._id,
                    name: item.title,
                    quantity: item.quantity,
                    image: item.image,                // Pass image
                    desc: item.desc     // Pass description
                })),
                price: grandTotal,
                paymentMethod // Pass the payment method here
            };
    
            await axios.post(`${BASE_URL}/orders`, orderDetails);
            
            // Update the stock after placing the order
            await Promise.all(items.map(async (item) => {
                await axios.put(`${BASE_URL}/products/${item._id}/stock`, {
                    quantityChange: -item.quantity
                });
            }));
            
            clearCart();
            setIsOrderPlaced(true);
            alert('Your order has been placed.');
    
            // Fetch latest order
            const orderResponse = await axios.get(`${BASE_URL}/orders`, {
                params: { userId: userProfile._id }
            });
            const userOrders = orderResponse.data.filter(order => order.userId === userProfile._id);
            const sortedOrders = userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const latestOrder = sortedOrders[0];
    
            if (!latestOrder) {
                throw new Error("No orders found for the user.");
            }
    
            const { _id, price } = latestOrder;
            setLatestOrderId(_id);
    
            if (paymentMethod === 'esewa') {
                const esewaResponse = await axios.post(`${BASE_URL}/initialize-esewa`, {
                    itemId: _id,
                    totalPrice: price,
                });
    
                const { payment, purchasedItemData } = esewaResponse.data;
    
                setPaymentData({ payment, purchasedItemData });
                setShowPaymentOptions(true); // Show payment options for eSewa
            } else {
                setShowPaymentOptions(false); // Hide payment options for Cash in Hand
            }
    
        } catch (err) {
            console.error('Error placing order:', err);
            alert('Failed to place order. Please try again.');
        }
    };
    



    const cancelOrder = async () => {
        if (!latestOrderId) {
            alert("No order to cancel.");
            return;
        }

        try {
            // Delete the order (this will also restore stock on the server side)
            await axios.delete(`${BASE_URL}/orders/${latestOrderId}`);
            
            setIsOrderPlaced(false);
            setShowPaymentOptions(false);
            setPaymentData(null);
            alert("Order has been cancelled.");
            clearCart();
            navigate('/home'); // Redirect or navigate as needed
        } catch (err) {
            console.error('Error cancelling order:', err);
            alert('Failed to cancel the order. Please try again.');
        }
    };

    const handleEsewa = () => {
        if (paymentData) {
            const confirmOrder = window.confirm('Confirm Pay ?');
            if (confirmOrder) {
            setItems([]);
            navigate('/esewa', { state: { paymentData } });
            }
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleCashInHand = () => {
        const confirmOrder = window.confirm('Are you sure you want to place the order ?');
    
        if (confirmOrder) {
            placeOrder('Cash in hand');
            navigate('/thankyou');
        }
    };

    const handlePaymentMethod = (method) => {
        placeOrder(method); // Pass the selected payment method to placeOrder
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='checkout-container'>
            <button className='back-button' onClick={goBack}>Shop More</button>
            <h1>Checkout</h1>

            <div className='Checkout-sub-container'>
                <div className='checkout-container-right'>
                    <div className='checkout-items-container'>
                        {items.length === 0 ? (
                            <p>No items in the cart.</p>
                        ) : (
                            items.map((item) => (
                                <div key={item._id} className='checkout-item'>
                                    <img src={`${BASE_URL}/${item.image}`} alt={item.name} className='checkout-item-image' />
                                    <h3>{item.title}</h3>
                                    <p>Rs.{item.price}</p>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                            ))
                        )}
                    </div>
                    {items.length > 0 && (
                        <div className='checkout-total'>
                            <h2>Total Amount: Rs.{grandTotal}</h2>
                        </div>
                    )}
                </div>
                <div className='user-details-container'>
                    <h2>User Details</h2>
                    {userProfile ? (
                        <div className='user-detail-content'>
                            <p><strong>Username:</strong> {userProfile.username}</p>
                            <p><strong>Email:</strong> {userProfile.email}</p>
                            <p><strong>Phone Number:</strong> {userProfile.phonenumber}</p>
                            <p><strong>Address:</strong> {userProfile.address}</p>
                            {paymentData && (
                                <div>
                                    <h2>Payment Details</h2>
                                    <p><strong>Item ID:</strong> {paymentData.purchasedItemData._id}</p>
                                    <p><strong>Total Price:</strong> Rs.{paymentData.purchasedItemData.price}</p>
                                    <p><strong>Payment Method:</strong> {paymentData.purchasedItemData.paymentMethod}</p>
                                    <p><strong>Status:</strong> {paymentData.purchasedItemData.status}</p>
                                    <p><strong>Purchase Date:</strong> {new Date(paymentData.purchasedItemData.purchaseDate).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>No user details available.</p>
                    )}
                    {!isOrderPlaced && (
                        <div>
                            <h2>Select Payment Method</h2>
                            <div className='proceed-payment'>
                                <button onClick={handleCashInHand}>Cash In Hand</button>
                                <button onClick={() => handlePaymentMethod('esewa')}>eSewa</button>
                            </div>
                        </div>
                    )}
                        {isOrderPlaced && showPaymentOptions && (
                        <div className='proceed-payment'>
                            <h2>Your Order Is Placed, Proceed To Pay.</h2>
                            <button onClick={cancelOrder}>Cancel Order</button>
                            <button onClick={handleEsewa}>Pay Now</button>   
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
