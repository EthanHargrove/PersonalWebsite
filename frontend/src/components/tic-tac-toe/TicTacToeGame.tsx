// External imports
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Canvas } from "@react-three/fiber";
import { Typography, Switch, Stack, Tooltip } from "@mui/material";
import Slider from "@mui/material-next/Slider";
// Internal imports
import "../../styles/main.css";
import "../../styles/tic-tac-toe.css";
import TicTacToeGrid from "./TicTacToeGrid";
import XPiece from "./XPiece";
import OPiece from "./OPiece";
import ThreeText from "./ThreeText";
import EmptySquare from "./EmptySquare";
// Import q-tables
import qTable5000RandSched from "../../assets/ttt_q_table5000_rand_sched.json";
import qTable10000RandSched from "../../assets/ttt_q_table10000_rand_sched.json";
import qTable50000RandSched from "../../assets/ttt_q_table50000_rand_sched.json";
import qTable100000RandSched from "../../assets/ttt_q_table100000_rand_sched.json";
import qTable500000RandSched from "../../assets/ttt_q_table500000_rand_sched.json";
import qTable1000000RandSched from "../../assets/ttt_q_table1000000_rand_sched.json";
import qTable5000000RandSched from "../../assets/ttt_q_table5000000_rand_sched.json";

import qTable5000Rand from "../../assets/ttt_q_table5000_rand.json";
import qTable10000Rand from "../../assets/ttt_q_table10000_rand.json";
import qTable50000Rand from "../../assets/ttt_q_table50000_rand.json";
import qTable100000Rand from "../../assets/ttt_q_table100000_rand.json";
import qTable500000Rand from "../../assets/ttt_q_table500000_rand.json";
import qTable1000000Rand from "../../assets/ttt_q_table1000000_rand.json";
import qTable5000000Rand from "../../assets/ttt_q_table5000000_rand.json";

import qTable5000Sched from "../../assets/ttt_q_table5000_sched.json";
import qTable10000Sched from "../../assets/ttt_q_table10000_sched.json";
import qTable50000Sched from "../../assets/ttt_q_table50000_sched.json";
import qTable100000Sched from "../../assets/ttt_q_table100000_sched.json";
import qTable500000Sched from "../../assets/ttt_q_table500000_sched.json";
import qTable1000000Sched from "../../assets/ttt_q_table1000000_sched.json";
import qTable5000000Sched from "../../assets/ttt_q_table5000000_sched.json";

import qTable5000 from "../../assets/ttt_q_table5000.json";
import qTable10000 from "../../assets/ttt_q_table10000.json";
import qTable50000 from "../../assets/ttt_q_table50000.json";
import qTable100000 from "../../assets/ttt_q_table100000.json";
import qTable500000 from "../../assets/ttt_q_table500000.json";
import qTable1000000 from "../../assets/ttt_q_table1000000.json";
import qTable5000000 from "../../assets/ttt_q_table5000000.json";

function TicTacToeGame() {
  const fontStyle = {
    fontFamily: "SpaceGrotesk",
    color: "#ffffff",
    marginBottom: "-4px",
  };

  const tooltipFontStyle = {
    fontFamily: "SpaceGrotesk",
    color: "#ffffff",
    // marginBottom: '-4px',
    textDecoration: "underline",
    textDecorationStyle: "dotted" as "dotted",
    display: "inline",
  };

  let gridCenterX = 0;
  let gridCenterY = 60;
  let gridDepth = 60;
  let gridArmLength = 200;
  let gridArmWidth = 20;
  let squareDist = gridArmLength + gridArmWidth;

  let pieceDepth = 32;
  let xArmLength = 40;
  let xArmWidth = 10;
  let vertGridColour = "#FFFFFF";
  let horiGridColour = "#FFFFFF";

  const [resultText, setResultText] = useState<string>("");
  const [qTable, setQTable] = useState<{ [key: string]: number }>(
    qTable5000000RandSched
  );
  const [showVals, setShowVals] = useState(true);
  const actions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const rowYVals = [
    gridCenterY + squareDist,
    gridCenterY,
    gridCenterY - squareDist,
  ];
  const colXVals = [
    gridCenterX - squareDist,
    gridCenterX,
    gridCenterX + squareDist,
  ];

  const marks = [
    { value: 3, label: "5K" },
    { value: 4, label: "10K" },
    { value: 5, label: "50K" },
    { value: 6, label: "100K" },
    { value: 7, label: "500K" },
    { value: 8, label: "1M" },
    { value: 9, label: "5M" },
  ];

  const [numEpisodes, setNumEpisodes] = useState<number>(5000000);
  const [rand, setRand] = useState<boolean>(true);
  const [sched, setSched] = useState<boolean>(true);

  const customSliderStyle = {
    "& .MuiSlider-thumb": {
      background: "radial-gradient(circle, #00FFFF, #FF1493)",
    },
    "& .MuiSlider-track": {
      background: "linear-gradient(22deg, #FF1493, #00FFFF)",
    },
    "& .MuiSlider-rail": {
      color: "transparent",
    },
    "& .MuiSlider-markLabel": {
      color: "#ffffff", // Customize the color of the tick labels
      fontSize: 12, // Customize the font size of the tick labels
    },
    "& .MuiSlider-active": {
      color: "transparent",
    },
  };

  const customSwitchStyle = {
    "& .MuiSwitch-thumb": {
      background: "radial-gradient(circle, #00FFFF, #FF1493)",
    },
    "& .Mui-checked + .MuiSwitch-track": {
      background: "linear-gradient(22deg, #FF1493, #00FFFF)",
    },
  };

  const resetGame = () => {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setCurrentPlayer(1);
    setResultText("");
  };

  useLayoutEffect(() => {
    for (let i = 0; i < 3; i++) {
      // Check each row, and column
      const rowSum = board[i].reduce((acc, current) => acc + current, 0);
      const colSum = board
        .map((row) => row[i])
        .reduce((acc, current) => acc + current, 0);
      if (rowSum === 3 || colSum === 3) {
        setResultText("Player ‘X' Wins!");
        return;
      } else if (rowSum === -3 || colSum === -3) {
        setResultText("Player ‘O' Wins!");
        return;
      }
    }
    let diagSum = board
      .map((row, index) => row[index])
      .reduce((prev, current) => prev + current);
    const antiDiagSum = board
      .map((row, index) => row[row.length - 1 - index])
      .reduce((prev, current) => prev + current);
    if (diagSum === 3 || antiDiagSum === 3) {
      setResultText("Player ‘X' Wins!");
      return;
    } else if (diagSum === -3 || antiDiagSum === -3) {
      setResultText("Player ‘O' Wins!");
      return;
    }
    if (board.some((row) => row.includes(0))) {
      setResultText("");
      return;
    }
    setResultText("It's a Draw!");
  }, [board]);

  const getQValue = (rowIndex: number, colIndex: number) => {
    let action = actions[rowIndex][colIndex];
    let key = `((${board.flat().join(", ")}), ${action})`;
    if (qTable.hasOwnProperty(key)) {
      return qTable[key].toFixed(5);
    } else if (resultText !== "") {
      return "";
    } else {
      return "?";
    }
  };

  const makeAIMove = () => {
    if (resultText !== "") {
      return;
    }
    const flatBoard: number[] = board.flat();
    const emptySquares: number[] = [];

    flatBoard.forEach((value, index) => {
      if (value === 0) {
        emptySquares.push(index);
      }
    });

    let bestValue: number = -2;
    let bestMove: number = 10;

    emptySquares.forEach((action, index) => {
      let value: number;
      let key = `((${board.flat().join(", ")}), ${action})`;
      if (qTable.hasOwnProperty(key)) {
        value = qTable[key];
      } else {
        value = 0;
      }
      if (index === 0 || value > bestValue) {
        bestValue = value;
        bestMove = action;
      }
    });
    if (emptySquares.length !== 0) {
      const row = Math.floor(bestMove / 3);
      const col = bestMove % 3;
      const newBoard = [...board];
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer * -1);
    }
  };

  useEffect(() => {
    if (numEpisodes === 5000 && rand && sched) {
      setQTable(qTable5000RandSched);
    } else if (numEpisodes === 5000 && rand) {
      setQTable(qTable5000Rand);
    } else if (numEpisodes === 5000 && sched) {
      setQTable(qTable5000Sched);
    } else if (numEpisodes === 5000) {
      setQTable(qTable5000);
    } else if (numEpisodes === 10000 && rand && sched) {
      setQTable(qTable10000RandSched);
    } else if (numEpisodes === 10000 && rand) {
      setQTable(qTable10000Rand);
    } else if (numEpisodes === 10000 && sched) {
      setQTable(qTable10000Sched);
    } else if (numEpisodes === 10000) {
      setQTable(qTable10000);
    } else if (numEpisodes === 50000 && rand && sched) {
      setQTable(qTable50000RandSched);
    } else if (numEpisodes === 50000 && rand) {
      setQTable(qTable50000Rand);
    } else if (numEpisodes === 50000 && sched) {
      setQTable(qTable50000Sched);
    } else if (numEpisodes === 50000) {
      setQTable(qTable50000);
    } else if (numEpisodes === 100000 && rand && sched) {
      setQTable(qTable100000RandSched);
    } else if (numEpisodes === 100000 && rand) {
      setQTable(qTable100000Rand);
    } else if (numEpisodes === 100000 && sched) {
      setQTable(qTable100000Sched);
    } else if (numEpisodes === 100000) {
      setQTable(qTable100000);
    } else if (numEpisodes === 500000 && rand && sched) {
      setQTable(qTable500000RandSched);
    } else if (numEpisodes === 500000 && rand) {
      setQTable(qTable500000Rand);
    } else if (numEpisodes === 500000 && sched) {
      setQTable(qTable500000Sched);
    } else if (numEpisodes === 500000) {
      setQTable(qTable500000);
    } else if (numEpisodes === 1000000 && rand && sched) {
      setQTable(qTable1000000RandSched);
    } else if (numEpisodes === 1000000 && rand) {
      setQTable(qTable1000000Rand);
    } else if (numEpisodes === 1000000 && sched) {
      setQTable(qTable1000000Sched);
    } else if (numEpisodes === 1000000) {
      setQTable(qTable1000000);
    } else if (numEpisodes === 5000000 && rand && sched) {
      setQTable(qTable5000000RandSched);
    } else if (numEpisodes === 5000000 && rand) {
      setQTable(qTable5000000Rand);
    } else if (numEpisodes === 5000000 && sched) {
      setQTable(qTable5000000Sched);
    } else if (numEpisodes === 5000000) {
      setQTable(qTable5000000);
    }
  }, [numEpisodes, rand, sched]);

  const handleEpisodeChange = (event: any, newValue: number) => {
    if (newValue === 3) {
      setNumEpisodes(5000);
    } else if (newValue === 4) {
      setNumEpisodes(10000);
    } else if (newValue === 5) {
      setNumEpisodes(50000);
    } else if (newValue === 6) {
      setNumEpisodes(100000);
    } else if (newValue === 7) {
      setNumEpisodes(500000);
    } else if (newValue === 8) {
      setNumEpisodes(1000000);
    } else if (newValue === 9) {
      setNumEpisodes(5000000);
    }
  };

  const handleRandChange = () => {
    setRand(!rand);
  };

  const handleSchedChange = () => {
    setSched(!sched);
  };

  return (
    <div className="content">
      <h3 className="game-result">{resultText}</h3>
      <Canvas style={{ width: "100%", height: "90%" }}>
        <ambientLight intensity={1} />
        <spotLight
          position={[-10, 10, 10]}
          angle={15}
          penumbra={1}
          intensity={300}
          castShadow
        />
        <group>
          <TicTacToeGrid
            x={gridCenterX}
            y={gridCenterY}
            armLength={gridArmLength}
            armWidth={gridArmWidth}
            depth={gridDepth}
            vertColour={vertGridColour}
            horiColour={horiGridColour}
          />
          {/* loop over each row */}
          {board.map((row, rowIndex: number) =>
            // loop over each column in the row
            row.map((piece, colIndex: number) =>
              piece === 1 ? (
                <XPiece
                  x={colXVals[colIndex]}
                  y={rowYVals[rowIndex]}
                  armLength={xArmLength}
                  armWidth={xArmWidth}
                  depth={pieceDepth}
                />
              ) : piece === -1 ? (
                <OPiece
                  x={colXVals[colIndex]}
                  y={rowYVals[rowIndex]}
                  radius={xArmLength}
                  width={xArmWidth}
                  depth={pieceDepth}
                />
              ) : showVals ? (
                <ThreeText
                  x={0.007 * colXVals[colIndex]}
                  y={0.007 * rowYVals[rowIndex]}
                  z={0.175}
                  value={getQValue(rowIndex, colIndex)}
                  gridArmLength={gridArmLength}
                  depth={pieceDepth}
                  row={rowIndex}
                  col={colIndex}
                  board={board}
                  setBoard={setBoard}
                  currentPlayer={currentPlayer}
                  setCurrentPlayer={setCurrentPlayer}
                />
              ) : (
                <EmptySquare
                  x={colXVals[colIndex]}
                  y={rowYVals[rowIndex]}
                  gridArmLength={gridArmLength}
                  depth={pieceDepth}
                  row={rowIndex}
                  col={colIndex}
                  visible={false}
                  colour={"#ffffff"}
                  board={board}
                  setBoard={setBoard}
                  currentPlayer={currentPlayer}
                  setCurrentPlayer={setCurrentPlayer}
                />
              )
            )
          )}
        </group>
      </Canvas>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn-glitch reset-btn" onClick={resetGame}>
          Reset Game
        </button>
        {showVals ? (
          <button
            className="btn-glitch values-btn"
            onClick={() => setShowVals(!showVals)}
          >
            Hide Q-Values
          </button>
        ) : (
          <button
            className="btn-glitch values-btn"
            onClick={() => setShowVals(!showVals)}
          >
            Show Q-Values
          </button>
        )}
        <button className="btn-glitch ai-move-btn" onClick={makeAIMove}>
          Make AI Move
        </button>
      </div>
      <div className="q-table-slider">
        <Typography style={fontStyle}>
          Number of episodes (games) trained:
        </Typography>
        <Slider
          min={3}
          max={9}
          defaultValue={9}
          step={1}
          marks={marks}
          sx={customSliderStyle}
          onChange={handleEpisodeChange}
          valueLabelDisplay="off"
          valueLabelFormat={(value: any) =>
            marks.find((mark) => mark.value === value)?.label || ""
          }
        />
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <Tooltip
            placement="left"
            title={
                "Starts from a randomly selected state rather than the beginning of the game for enhanced exploration."
            }
          >
            <Typography style={tooltipFontStyle}>Exploring starts</Typography>
          </Tooltip>
          <Switch
            defaultChecked
            onChange={handleRandChange}
            sx={customSwitchStyle}
          />
          <Switch
            defaultChecked
            onChange={handleSchedChange}
            sx={customSwitchStyle}
          />
          <Tooltip
            placement="right"
            title={
              "Starts from always exploring (ε=1) and linearly decreases to always exploiting (ε=0) for faster convergence. Otherwise exploration rate is constant (ε=0.1)."
            }
          >
            <Typography style={tooltipFontStyle}>ε-scheduling</Typography>
          </Tooltip>
        </Stack>
      </div>
    </div>
  );
}

export default TicTacToeGame;
