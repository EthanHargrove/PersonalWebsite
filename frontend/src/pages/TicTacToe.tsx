// External imports
import React from "react";
// Internal imports
import "../styles/main.css";
import "../styles/tic-tac-toe.css";
import TicTacToeGame from "../components/tic-tac-toe/TicTacToeGame";
import Navbar from "../components/Navbar";

function TicTacToe() {
  return (
    <>
      <div className="cyberpunk-background"></div>
      <Navbar active="" />
      <TicTacToeGame />
    </>
  );
}

export default TicTacToe;
