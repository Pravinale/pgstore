import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

const Login = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext); // Access login function from AuthContext

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${BASE_URL}/login`, { username, password });
            if (result.data.status === 'Success') {
                login({ userId: result.data.userId, role: result.data.role });
                navigate(`/home/${result.data.userId}`);
            } else {
                setError(result.data.message); // Display error message
            }
        } catch (err) {
            console.error(err);
            setError('Login failed, please try again.');
        }
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleLogin}>
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>}
                <div className='login-content'>
                    <h3>Username</h3>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='login-content'>
                    <h3>Password</h3>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <div className='haveaccount'>Don't have an account? <span><Link to='/signup' >Sign Up</Link></span></div>
                <div className='forgot-password'>
                    <Link to='/forgot-password'>Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
