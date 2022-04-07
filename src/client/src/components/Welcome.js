import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Button from '@mui/material/Button';

const Welcome = () => {
    const [userContext, setUserContext] = useContext(UserContext);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}users/me`, { withCredentials: true, headers: {
                "Authorization": `Bearer ${userContext.token}`
            } });
            setUserContext(oldValues => {
                return { ...oldValues, details: response.data }
            });
        } catch (error) {
            setUserContext(oldValues => {
                return { ...oldValues, details: null }
            });
        }
    }

    const logout = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}users/logout`, { withCredentials: true, headers: {
                "Authorization": `Bearer ${userContext.token}`
            } });
            setUserContext(oldValues => {
                return { ...oldValues, details: undefined, token: null }
            });
        } catch (error) {
            setUserContext(oldValues => {
                return { ...oldValues, details: null }
            });
        }
    }

    useEffect(() => {
        if (!userContext.details)
            fetchUserDetails();
    }, [])

    return (
        <div className="user-details">
            <div>
                <p>
                    Welcome&nbsp;
                    <strong>
                    {userContext.details?.firstName}
                    {userContext.details?.lastName &&
                        " " + userContext?.details.lastName}
                    </strong>!
                </p>
                <p>
                    Your reward points: <strong>{userContext.details?.points}</strong>
                </p>
                <Button onClick={logout}>Logout</Button>
            </div>
        </div>
    );
}

export default Welcome;
