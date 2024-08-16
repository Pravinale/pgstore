import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import USERSDATA from '../../USERDATA';
import { UserContext } from '../../contexts/userContext';
import {Link} from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = USERSDATA.find(user => user.username === username && user.password === parseInt(password));

    if (user) {
      login(user);
      navigate(`/home/${user.id}`);
    //   alert('Login successful!');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className='login-content'>
          <h3>Username</h3>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='login-content'>
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <div className='haveaccount'>Don't have an account? <span><Link to='/signup' >Sign Up</Link></span></div>
      </form>
    </div>
  );
};

export default Login;
