import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../context/AuthContext';

const Copyright = (props) =>
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="/">
            Link Page
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [errors, setErrors] = useState([]);
    const { signup } = useContext(AuthContext);

    const navigate = useNavigate();

    const { username, password, firstName, lastName } = formData;

    const onInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            navigate('/welcome');
        } catch (error) {
            console.log(error.response.data.errors);
            setErrors(error.response.data.errors);
            setTimeout(() => {
                setErrors([]);
            }, 3000)
        }
    }

    return (   
        <>
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    { errors.map((error, i) => <Alert severity='error' sx={{ m: 2 }} key={i}>{ error.msg }</Alert>) }
                    <TextField
                        onChange={onInputChange}
                        value={firstName}
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoFocus
                    />
                    <TextField
                        onChange={onInputChange}
                        value={lastName}
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoFocus
                    />
                    <TextField
                        onChange={onInputChange}
                        value={username}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={onInputChange}
                        value={password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                    <Grid item>
                        <Link to="/login" variant="body2">
                            {"Have an account? Sign in"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </>
    );
}

export default Signup;
