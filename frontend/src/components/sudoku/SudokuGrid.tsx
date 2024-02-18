// External imports
import React, { useState, useLayoutEffect } from 'react';
import { useSpring, animated } from "react-spring";
import { Canvas } from '@react-three/fiber'; 
import { Grid, Typography } from '@mui/material';
import Slider from '@mui/material-next/Slider';
// Internal imports
import "../../styles/main.css";
import "../../styles/sudoku.css";
import SudokuCell from './SudokuCell';


interface SudokuGridProps {
  position: string,
  grid: number[][],
  startingGrid: number[][],
}

const SudokuGrid: React.FC<SudokuGridProps> = (props) => {
    let {position, grid, startingGrid} = props;

    const width: string = '161px';
    const height: string = '161px';
    const borderType: string = '4px solid #d3d3d3';

    const getBorderStyle = () => {
        if (position === "topLeft"){
          return {
            width: width,
            height: height,
            borderTop: borderType,
            borderLeft: borderType,
            padding: '0px', 
          };
        } else if (position === "topMiddle"){
          return {
            width: width,
            height: height,
            borderRight: borderType, 
            borderTop: borderType,
            borderLeft: borderType, 
            padding: '0px', 
          };
        } else if (position === "topRight"){
          return {
            width: width,
            height: height,
            borderTop: borderType,
            borderRight: borderType,
            padding: '0px', 
          };
        } else if (position === "middleLeft"){
          return {
            width: width,
            height: height,
            borderTop: borderType,
            borderBottom: borderType,
            borderLeft: borderType,
            padding: '0px', 
          };
        } else if (position === "middleMiddle"){
          return {
              width: width,
              height: height,
              borderTop: borderType,
              borderBottom: borderType,
              borderLeft: borderType,
              borderRight: borderType, 
              padding: '0px', 
          };
        } else if (position === "middleRight"){
          return {
            width: width,
            height: height,
            borderTop: borderType,
            borderBottom: borderType,
            borderRight: borderType, 
            padding: '0px', 
          };
        } else if (position === "bottomLeft"){
          return {
            width: width,
            height: height,
            borderBottom: borderType, 
            borderLeft: borderType, 
            padding: '0px', 
          };
        } else if (position === "bottomMiddle"){
          return {
            width: width,
            height: height,
            borderBottom: borderType, 
            borderLeft: borderType, 
            borderRight: borderType, 
            padding: '0px', 
          };
        } else if (position === "bottomRight"){
          return {
            width: width,
            height: height,
            borderBottom: borderType,
            borderRight: borderType,  
            padding: '0px', 
          };
        } else {
          return {
            width: width,
            height: height,
            padding: '0px', 
          };
        }
      }
      
    const borderStyle = getBorderStyle();

    const positions = [["topLeft", "topMiddle", "topRight"], ["middleLeft", "middleMiddle", "middleRight"], ["bottomLeft", "bottomMiddle", "bottomRight"]];

    return (
        <Grid container spacing={0} style={borderStyle}>
            {grid.map((row, rowIndex) => (
                <Grid container item key={rowIndex} spacing={0} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {row.map((cell, colIndex) => (
                    <Grid item key={colIndex} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='noteCell'>
                        <SudokuCell 
                          position={positions[rowIndex][colIndex]}
                          number={cell}
                          notes={[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]}
                          starting={cell === startingGrid[rowIndex][colIndex]}/>
                    </Grid>
                ))}
                </Grid>
            ))}
        </Grid>
    )
}

export default SudokuGrid;