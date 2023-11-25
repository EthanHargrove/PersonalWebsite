// External imports
import React from 'react';
// Internal imports
import "../styles/main.css";
import "../styles/tic-tac-toe.css";
import TicTacToeGame from '../components/tic-tac-toe/TicTacToeGame';

function TicTacToe() {
    return (
        <>
            <div className='cyberpunk-background'></div>
            <TicTacToeGame />
        </>
    )
}

export default TicTacToe;