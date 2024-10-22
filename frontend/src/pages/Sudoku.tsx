// External imports
import React from "react";
// Internal imports
import "../styles/main.css";
import Navbar from "../components/Navbar";
import SudokuGame from "../components/sudoku/SudokuGame";

function Sudoku() {
  return (
    <>
      <div
        className="blur-background"
        style={{
          position: "fixed",
          backgroundImage: "url(./images/CyberpunkBackground.png)",
        }}
      />
      <Navbar active="" />
      <SudokuGame />
    </>
  );
}

export default Sudoku;
export {};
