import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/reset-password/${token}`, { newPassword });
            setMessage(response.data.message);
            setNewPassword('');
        } catch (err) {
            console.error('Error during password reset:', err);
            if (err.response && err.response.data.message) {
                setMessage(err.response.data.message); // Display specific error message
            } else {
                setMessage('Error updating password. Please try again.');
            }
        }
    };

    return (
        <div className='reset-password-container'>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Update Password</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
