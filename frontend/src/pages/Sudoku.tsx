// External imports
import React from 'react';
// Internal imports
import "../styles/main.css";
import Navbar from '../components/Navbar';
import SudokuCell from '../components/sudoku/SudokuCell';

function Sudoku() {
    return (
        <>
            <div className='cyberpunk-background'></div>
            <Navbar active=""/>
            <div className='content'>
                <SudokuCell notes={[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]} />
            </div>
        </>
    )
}

export default Sudoku;
export {}