// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../contexts/AuthContext';
// import './UserDashboard.css'
// import { useNavigate } from 'react-router-dom'; 


// const UserDashboard = () => {
//     const { isAuthenticated, user } = useContext(AuthContext);
//     const [userProfile, setUserProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const BASE_URL = process.env.REACT_APP_BASE_URL;
//     const navigate = useNavigate(); 

//     useEffect(() => {
//         if (!isAuthenticated) {
//             return; // Redirect or handle unauthenticated users
//         }

     
//         const fetchUserProfile = async () => {
//             try {
//                 const userid = user.userId
//                 const response = await axios.get(`${BASE_URL}/users/${userid}/profile`);
//                 setUserProfile(response.data);
//             } catch (error) {
//                 setError('Error fetching user profile.');
//                 console.error('Error fetching user profile:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserProfile();
//     }, [isAuthenticated, user]);

//     if (!isAuthenticated) {
//         return <div>Please log in to view your dashboard.</div>;
//     }

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     const handleMyOrders = () =>{
//             navigate('/myorders')
//     }

//     return (
//         <div className='dashboard-container'>
            
//             <h1>Profile Dashboard</h1>
//             <p><strong>Username:</strong> {userProfile.username}</p>
//             <p><strong>Email:</strong> {userProfile.email}</p>
//             <p><strong>Phone Number:</strong> {userProfile.phonenumber}</p>
//             <p><strong>Address:</strong> {userProfile.address}</p>
//             <button onClick={handleMyOrders}>
//                 My Orders
//             </button>
//         </div>
//     );
// };

// export default UserDashboard;


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom'; 

const UserDashboard = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!isAuthenticated) {
            return; // Redirect or handle unauthenticated users
        }

        const fetchUserProfile = async () => {
            try {
                const userid = user.userId;
                const response = await axios.get(`${BASE_URL}/users/${userid}/profile`);
                setUserProfile(response.data);
            } catch (error) {
                setError('Error fetching user profile.');
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [isAuthenticated, user, BASE_URL]);

    if (!isAuthenticated) {
        return <div>Please log in to view your dashboard.</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleMyOrders = () => {
        navigate('/myorders');
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className='dashboard-container'>
            <button onClick={handleBack} className='back-button'>Back</button> {/* Add Back Button */}
            <h1>Profile Dashboard</h1>
            <p><strong>Username:</strong> {userProfile.username}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Phone Number:</strong> {userProfile.phonenumber}</p>
            <p><strong>Address:</strong> {userProfile.address}</p>
            <button onClick={handleMyOrders}>
                My Orders
            </button>
        </div>
    );
};

export default UserDashboard;
