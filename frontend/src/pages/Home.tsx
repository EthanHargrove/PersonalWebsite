// External imports
import React from 'react';
// Internal imports
import "../styles/main.css";
import Navbar from '../components/Navbar';

function Home() {
    return (
        <>
            <div className='cyberpunk-background'></div>
            <Navbar active="home"/>
        </>
    )
}

export default Home;