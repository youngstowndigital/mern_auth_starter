import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ token: null });
    const { getToken } = useContext(AuthContext);

    const fetchUserDetails = async () => {
        try {
            const token = await getToken();
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}users/me`, { withCredentials: true, headers: {
                "Authorization": `Bearer ${token}`
            } });
            setUser({...user, details: response.data });
        } catch (error) {
            setUser({ ...user, details: null });
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, fetchUserDetails }}>
            { children }
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
