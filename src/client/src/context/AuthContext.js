import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null });

    const getToken = async () => {
        if (auth.token)
            return auth.token;

        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/refreshtoken`, {}, { withCredentials: true });
        setAuth({ ...auth, token: response.data.token });
        return response.data.token;
    }

    const login = async (formData) => {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/login`, formData, { withCredentials: true });
        setAuth(oldValues => {
            return { ...oldValues, token: response.data.token }
        });
    }

    const logout = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}users/logout`, { withCredentials: true, headers: {
                "Authorization": `Bearer ${auth.token}`
            } });
            setAuth({ ...auth, details: undefined, token: null });
        } catch (error) {
            setAuth({ ...auth, details: null });
        }
    }

    const signup = async (formData) => {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/signup`, formData, { withCredentials: true });
        console.log(response.data);
        setAuth(oldValues => {
            return { ...oldValues, token: response.data.token }
        });
    }

    return (
        <AuthContext.Provider value={{ setAuth, getToken, logout, login, signup }}>
            { children }
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
