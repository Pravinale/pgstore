import React, { useEffect, useState } from 'react';
import './ActivateAccount.css'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivateAccount = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/activate/${token}`)
            .then(response => {
                setMessage(response.data.message);
                    navigate('/login');
            })
            .catch(error => {
                setMessage(error.response?.data?.message || 'Activation failed. Please try again.');
            });
    }, [token, navigate]);



    return (
        <div className='activate-account-container'>
            <h1>{message}</h1>
        </div>
    );
};

export default ActivateAccount;
