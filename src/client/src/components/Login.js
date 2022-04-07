import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
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

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { username, password } = formData;

    const onInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/welcome');
        } catch (error) {
            console.log(error.response.data.errors);
            setError("Invalid username/password");
            setTimeout(() => {
                setError(null);
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    { error && <Alert severity='error' sx={{ m: 2 }}>{ error }</Alert> }
                    <TextField
                        onChange={onInputChange}
                        value={username}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Email Address"
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
                        Sign In
                    </Button>
                    <Grid container>
                    <Grid item>
                        <Link to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </>
    );
}

export default Login;
