// External imports
import React from 'react';
// Internal imports
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ConstructionSharpIcon from '@mui/icons-material/ConstructionSharp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import GlitchComponent from './GlitchComponent';
import '../styles/navbar.css';

interface NavbarProps {
    active: string;
}

const Navbar = (props: NavbarProps) => {
    return (
        <div className="navbar">
            {/* LinkedIn button */}
            <GlitchComponent>
                <FontAwesomeIcon
                    icon={faLinkedin}
                    className='navbar-btn fa-btn'
                />
            </GlitchComponent>
            {/* Home button */}
            <GlitchComponent>
                <HomeSharpIcon
                    fontSize='inherit'
                    className='navbar-btn'
                />
            </GlitchComponent>
            {/* Projects button */}
            <GlitchComponent>
                <ConstructionSharpIcon 
                    fontSize='inherit'
                    className={`navbar-btn ${props.active === 'projects' ? 'active' : ''}`}
                />
            </GlitchComponent>
            {/* Github button */}
            <GlitchComponent>
                <FontAwesomeIcon
                    icon={faGithub}
                    className='navbar-btn fa-btn'
                />
            </GlitchComponent>
        </div>
    );
}

export default Navbar;