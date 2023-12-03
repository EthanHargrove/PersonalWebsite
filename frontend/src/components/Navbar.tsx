// External imports
import React from 'react';
// Internal imports
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ConstructionSharpIcon from '@mui/icons-material/ConstructionSharp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import GlitchComponent from './GlitchComponent';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <GlitchComponent>
                <ConstructionSharpIcon 
                    fontSize='inherit'
                    className='navbar-btn'
                />
            </GlitchComponent>
            <GlitchComponent>
                <HomeSharpIcon
                    fontSize='inherit'
                    className='navbar-btn'
                />
            </GlitchComponent>
            <GlitchComponent>
                <FontAwesomeIcon
                    icon={faLinkedin}
                    className='navbar-btn'
                />
            </GlitchComponent>
            <GlitchComponent>
                <FontAwesomeIcon
                    icon={faGithub}
                    className='navbar-btn'
                />
            </GlitchComponent>
        </div>
    );
}

export default Navbar;