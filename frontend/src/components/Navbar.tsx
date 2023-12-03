// External imports
import React from 'react';
import { ButtonGroup } from '@mui/material';
// Internal imports
import HomeButton from '../components/buttons/HomeButton'
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <HomeButton />
        </div>
    );
}

export default Navbar;