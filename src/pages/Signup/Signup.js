import React, { useState } from 'react';
import './Signup.css';
import {Link} from 'react-router-dom'

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!username || !phonenumber || !address || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        else {
            alert('Sign Up Successful!');
            setUsername('');
            setPhonenumber('');
            setAddress('');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className='signup-container'>
            <form className='form' onSubmit={handleSignUp}>
                <h1>Sign Up</h1>

                <div className='form-body'>
                    <div className='form-content'>
                        <h3>Userame</h3>
                        <input
                            type="text"
                            placeholder="Userame"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className='form-content'>
                        <h3>Phone Number</h3>
                        <input
                            type="number"
                            placeholder="Phone Number"
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                        />
                    </div>

                    <div className='form-content'>
                        <h3>Address</h3>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className='form-content'>
                        <h3>Email Address</h3>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='form-content'>
                        <h3>Password</h3>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button type='submit'>Sign Up </button>

                <div className='haveaccount'>Already have an account? <span><Link to='/login' >Login</Link></span></div>
            </form>
        </div>
    );
};

export default SignUp;
