// External imports
import React, { useState, useLayoutEffect } from 'react';
import { useSpring, animated } from "react-spring";
import { Canvas } from '@react-three/fiber'; 
import { Typography } from '@mui/material';
import Slider from '@mui/material-next/Slider';
// Internal imports
import "../../styles/main.css";
import "../../styles/tic-tac-toe.css";
import TicTacToeGrid from './TicTacToeGrid';
import XPiece from './XPiece';
import OPiece from './OPiece';
import ThreeText from './ThreeText';
import EmptySquare from './EmptySquare';
// Import q-tables
import qTable5000 from '../../assets/ttt_q_table5000_rand_sched.json';
import qTable10000 from '../../assets/ttt_q_table10000_rand_sched.json';
import qTable50000 from '../../assets/ttt_q_table50000_rand_sched.json';
import qTable100000 from '../../assets/ttt_q_table100000_rand_sched.json';
import qTable500000 from '../../assets/ttt_q_table500000_rand_sched.json';
import qTable1000000 from '../../assets/ttt_q_table1000000_rand_sched.json';
import qTable5000000 from '../../assets/ttt_q_table5000000_rand_sched.json';

function TicTacToeGame() {
    const fontStyle =  {
        fontFamily: 'SpaceGrotesk',
        color: '#ffffff',
        marginBottom: '-4px',
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
    let vertGridColour = '#FFFFFF';
    let horiGridColour = '#FFFFFF';
    
    const [resultText, setResultText] = useState<string>("");
    const [qTable, setQTable] = useState<{[key: string]: number}>(qTable5000000);
    const [showVals, setShowVals] = useState(true);
    const actions = [[0,1,2],[3,4,5],[6,7,8]];
    const [board, setBoard] = useState<number[][]>([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const rowYVals = [gridCenterY+squareDist, gridCenterY, gridCenterY-squareDist];
    const colXVals = [gridCenterX-squareDist, gridCenterX, gridCenterX+squareDist];

    const marks = [
        { value: 3, label: '5K' },
        { value: 4, label: '10K' },
        { value: 5, label: '50K' },
        { value: 6, label: '100K' },
        { value: 7, label: '500K' },
        { value: 8, label: '1M' },
        { value: 9, label: '5M' },
    ];

    const CustomSliderStyles = {
        '& .MuiSlider-thumb': {
            background: 'radial-gradient(circle, #00FFFF, #FF1493)',
        },
        '& .MuiSlider-track': {
            background: 'linear-gradient(22deg, #FF1493, #00FFFF)',
        },
        '& .MuiSlider-rail': {
            color: "transparent"
        },
        '& .MuiSlider-markLabel': {
            color: '#ffffff', // Customize the color of the tick labels
            fontSize: 12,  // Customize the font size of the tick labels
          },
        '& .MuiSlider-active': {
            color: "transparent"
        },
    };

    const resetGame = () => {
        setBoard([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
        setCurrentPlayer(1);
        setResultText("");
    };

    useLayoutEffect(() => {
        for (let i=0; i < 3; i++){
            // Check each row, and column
            const rowSum = board[i].reduce((acc, current) => acc + current, 0)
            const colSum = board.map(row => row[i]).reduce((acc, current) => acc + current, 0)
            if ((rowSum === 3) || (colSum === 3)){
                setResultText("Player ‘X' Wins!");
                return;
            } else if ((rowSum === -3) || (colSum === -3)) {
                setResultText("Player ‘O' Wins!");
                return;
            }
        }
        let diagSum = board.map((row, index) => row[index]).reduce((prev, current) => prev + current);
        const antiDiagSum = board.map((row, index) => row[row.length - 1 - index]).reduce((prev, current) => prev + current);
        if ((diagSum === 3) || (antiDiagSum === 3)){
            setResultText("Player ‘X' Wins!");
            return;
        } else if ((diagSum === -3) || (antiDiagSum === -3)){
            setResultText("Player ‘O' Wins!");
            return;
        }
        if (board.some(row => row.includes(0))){
            setResultText("");
            return;
        }
        setResultText("It's a Draw!");
    }, [board]);

    const getQValue = (rowIndex: number, colIndex: number) => {
        let action = actions[rowIndex][colIndex];
        let key = `((${board.flat().join(', ')}), ${action})`;
        if (qTable.hasOwnProperty(key)) {
            return qTable[key].toFixed(5);
        } else if (resultText !== "") {
            return "";
        } else {
            return "?";
        }
    };

    const makeAIMove = () => {
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
            let key = `((${board.flat().join(', ')}), ${action})`;
            if (qTable.hasOwnProperty(key)) {
                value = qTable[key];
            } else {
                value = 0
            }
            if (index === 0 || value > bestValue) {
                bestValue = value;
                bestMove = action;
            }
        });
        if (emptySquares.length !== 0) {
            const row = Math.floor(bestMove / 3)
            const col = bestMove % 3;
            const newBoard = [...board];
            newBoard[row][col] = currentPlayer;
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer*-1);
        }
    }

    const handleTableChange = (event: any, newValue: number) => {
        if (newValue === 3) {
            setQTable(qTable5000);
        } else if (newValue === 4) {
            setQTable(qTable10000);
        } else if (newValue === 5) {
            setQTable(qTable50000);
        } else if (newValue === 6) {
            setQTable(qTable100000);
        } else if (newValue === 7) {
            setQTable(qTable500000);
        } else if (newValue === 8) {
            setQTable(qTable1000000);
        } else if (newValue === 9) {
            setQTable(qTable5000000);
        }
    };

    const style = useSpring({
        from: { 
          opacity: 0.1,
        },
        to: { 
          opacity: 1,
        },
      });

    return (
        <animated.div className='content' style={style}>
            <h3 className='game-result'>{resultText}</h3>
            <Canvas>
                <ambientLight intensity={1}/>
                <spotLight position={[-10, 10, 10]} angle={15} penumbra={1} intensity={300} castShadow />
                <group>
                    <TicTacToeGrid x={gridCenterX} y={gridCenterY} armLength={gridArmLength} armWidth={gridArmWidth} depth={gridDepth} vertColour={vertGridColour} horiColour={horiGridColour} />
                    {/* loop over each row */}
                    {board.map((row, rowIndex: number) => (
                        // loop over each column in the row
                        row.map((piece, colIndex: number) => (
                            piece === 1 ? (<XPiece x={colXVals[colIndex]} y={rowYVals[rowIndex]} armLength={xArmLength} armWidth={xArmWidth} depth={pieceDepth} />)
                            : piece === -1 ? (<OPiece x={colXVals[colIndex]} y={rowYVals[rowIndex]} radius={xArmLength} width={xArmWidth} depth={pieceDepth} />)
                            : showVals ? (<ThreeText x={0.006*colXVals[colIndex]} y={0.006*rowYVals[rowIndex]} z={0.175} value={getQValue(rowIndex, colIndex)} gridArmLength={gridArmLength} depth={pieceDepth} row={rowIndex} col={colIndex} board={board} setBoard={setBoard} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>)
                            : (<EmptySquare x={colXVals[colIndex]} y={rowYVals[rowIndex]} gridArmLength={gridArmLength} depth={pieceDepth} row={rowIndex} col={colIndex} visible={false} colour={'#ffffff'} board={board} setBoard={setBoard} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>)
                        ))
                    ))}
                </group>
            </Canvas>
            <button className='btn-glitch reset-btn' onClick={resetGame}>
                Reset Game
            </button>
            {showVals ? (
                <button className='btn-glitch values-btn' onClick={() => setShowVals(!showVals)}>
                    Hide Q-Values
                </button>
            ) : (
                <button className='btn-glitch values-btn' onClick={() => setShowVals(!showVals)}>
                    Show Q-Values
                </button>
            )}
            <button className='btn-glitch ai-move-btn' onClick={makeAIMove}>
                Make AI Move
            </button>
            <div className='q-table-slider'>
                <Typography 
                    style={fontStyle}
                >
                    Number of episodes (games) trained:
                </Typography>
                <Slider 
                    min={3}
                    max={9}
                    defaultValue={9}
                    step={1}
                    marks={marks}
                    sx={CustomSliderStyles}
                    onChange={handleTableChange}
                    valueLabelDisplay="off"
                    valueLabelFormat={(value:any) => marks.find(mark => mark.value === value)?.label || ''}
                />
            </div>
        </animated.div>
    )
}

export default TicTacToeGame;