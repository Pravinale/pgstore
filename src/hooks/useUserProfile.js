import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const useUserProfile = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        if (!isAuthenticated || !user) {
            setLoading(false); // No need to continue if not authenticated or user is null
            return;
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

    return { userProfile, loading, error };
};

export default useUserProfile;
