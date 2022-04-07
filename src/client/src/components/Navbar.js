import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () =>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Link Page
            </Typography>
            <Link to="/signup" style={{ textDecoration: 'none', color: '#fff' }}>
                <Button color="inherit">Sign Up</Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>
                <Button color="inherit">Login</Button>
            </Link>
            </Toolbar>
        </AppBar>
    </Box>

export default Navbar;
