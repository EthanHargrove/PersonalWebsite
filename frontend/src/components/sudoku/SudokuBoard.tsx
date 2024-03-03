// External imports
import React, { useState, useLayoutEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Canvas } from "@react-three/fiber";
import { Grid, Typography } from "@mui/material";
import Slider from "@mui/material-next/Slider";
// Internal imports
import "../../styles/main.css";
import "../../styles/sudoku.css";
import SudokuGrid from "./SudokuGrid";

interface SudokuBoardProps {
  puzzle: number[][];
  startingPuzzle: number[][];
  notes: number[][][];
  notesChanges: number[][][];
}

const SudokuBoard: React.FC<SudokuBoardProps> = (props) => {
  let { puzzle, startingPuzzle, notes, notesChanges } = props;
  const grid = Array.from({ length: 3 }, () => Array(3).fill(0));

  const positions = [
    ["topLeft", "topMiddle", "topRight"],
    ["middleLeft", "middleMiddle", "middleRight"],
    ["bottomLeft", "bottomMiddle", "bottomRight"],
  ];

  return (
    <Grid container spacing={0} className="sudokuBoard">
      {grid.map((row, rowIndex) => (
        <Grid
          container
          item
          key={rowIndex}
          spacing={0}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Grid container item key={rowIndex} spacing={0}> */}
          {row.map((col, colIndex) => (
            <Grid
              item
              key={colIndex}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SudokuGrid
                position={positions[rowIndex][colIndex]}
                grid={puzzle
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((gridRow) =>
                    gridRow.slice(colIndex * 3, colIndex * 3 + 3)
                  )}
                startingGrid={startingPuzzle
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((startGridRow) =>
                    startGridRow.slice(colIndex * 3, colIndex * 3 + 3)
                  )}
                notes={notes
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((notesRow) =>
                    notesRow.slice(colIndex * 3, colIndex * 3 + 3)
                  )}
                notesChanges={notesChanges
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((notesChangesRow) =>
                    notesChangesRow.slice(colIndex * 3, colIndex * 3 + 3)
                  )}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default SudokuBoard;
