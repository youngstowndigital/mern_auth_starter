import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Button from '@mui/material/Button';
import { AuthContext } from '../context/AuthContext';

const Welcome = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const { user, fetchUserDetails } = useContext(UserContext);

    const logoutClick = async (e) => {
        await logout();
        navigate('/login');
    }

    useEffect(() => {
        fetchUserDetails();
    }, [])

    return (
        <div className="user-details">
            <div>
                <p>
                    Welcome&nbsp;
                    <strong>
                    {user.details?.firstName}
                    {user.details?.lastName &&
                        " " + user?.details.lastName}
                    </strong>!
                </p>
                <p>
                    Your reward points: <strong>{user.details?.points}</strong>
                </p>
                <Button onClick={logoutClick}>Logout</Button>
            </div>
        </div>
    );
}

export default Welcome;
