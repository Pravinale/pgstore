import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/forgot-password`, { email });
            setMessage(response.data.message);
            setEmail('');
        } catch (err) {
            console.error(err);
            setMessage('Error sending reset link. Please try again.');
        }
    };

    return (
        <div className='forgot-password-container'>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Link</button>

                {message && <p>{message}</p>}
            </form>

        </div>
    );
};

export default ForgotPassword;
