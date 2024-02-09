// External imports
import React from 'react';
import { Link } from 'react-router-dom';
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
            <a href="https://www.linkedin.com/in/ethan-hargrove" className='link' target="_blank" rel="noopener noreferrer">
                <GlitchComponent>
                    <FontAwesomeIcon
                        icon={faLinkedin}
                        className='navbar-btn fa-btn'
                    />
                </GlitchComponent>
            </a>

            {/* CV Button */}

            {/* Home button */}
            <Link to="/">
                <GlitchComponent>
                    <HomeSharpIcon
                        fontSize='inherit'
                        className={`navbar-btn ${props.active === 'home' ? 'active' : ''}`}
                    />
                </GlitchComponent>
            </Link>

            {/* Projects button */}
            <Link to="/projects">
                <GlitchComponent>
                    <ConstructionSharpIcon 
                        fontSize='inherit'
                        className={`navbar-btn ${props.active === 'projects' ? 'active' : ''}`}
                    />
                </GlitchComponent>
            </Link>

            {/* Github button */}
            <a href="https://github.com/EthanHargrove" className='link' target="_blank" rel="noopener noreferrer">
                <GlitchComponent>
                    <FontAwesomeIcon
                        icon={faGithub}
                        className='navbar-btn fa-btn'
                    />
                </GlitchComponent>
            </a>
        </div>
    );
}

export default Navbar;