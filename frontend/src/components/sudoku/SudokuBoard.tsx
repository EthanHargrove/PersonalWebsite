// External imports
import React, { useState, useLayoutEffect } from 'react';
import { useSpring, animated } from "react-spring";
import { Canvas } from '@react-three/fiber'; 
import { Grid, Typography } from '@mui/material';
import Slider from '@mui/material-next/Slider';
// Internal imports
import "../../styles/main.css";
import "../../styles/sudoku.css";
import SudokuGrid from './SudokuGrid';


function SudokuBoard() {
    let board: string[][] = Array.from({ length: 3 }, () => Array(3).fill(""));

    const positions = [["topLeft", "topMiddle", "topRight"], ["middleLeft", "middleMiddle", "middleRight"], ["bottomLeft", "bottomMiddle", "bottomRight"]];

    return (
        <Grid container spacing={0} className="sudokuBoard">
            {board.map((row, rowIndex) => (
                <Grid container item key={rowIndex} spacing={0} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {row.map((cell, colIndex) => (
                    <Grid item key={colIndex} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <SudokuGrid position={positions[rowIndex][colIndex]}/>
                    </Grid>
                ))}
                </Grid>
            ))}
        </Grid>
    )
}

export default SudokuBoard;