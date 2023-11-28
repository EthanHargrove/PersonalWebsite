// External imports
import React, { useState, useLayoutEffect } from 'react';
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
import qTable10 from '../../assets/ttt_q_table10.json';
import qTable100 from '../../assets/ttt_q_table100.json';
import qTable1000 from '../../assets/ttt_q_table1000.json';
import qTable10000 from '../../assets/ttt_q_table10000.json';
import qTable100000 from '../../assets/ttt_q_table100000.json';
import qTable1000000 from '../../assets/ttt_q_table1000000.json';
import qTable10000000 from '../../assets/ttt_q_table10000000.json';

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
    const [qTable, setQTable] = useState<{[key: string]: number}>(qTable10000000);
    const [showVals, setShowVals] = useState(false);
    const actions = [[0,1,2],[3,4,5],[6,7,8]];
    const [board, setBoard] = useState<number[][]>([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const rowYVals = [gridCenterY+squareDist, gridCenterY, gridCenterY-squareDist];
    const colXVals = [gridCenterX-squareDist, gridCenterX, gridCenterX+squareDist];

    const marks = [
        { value: 1, label: '10'},
        { value: 2, label: '100' },
        { value: 3, label: '1K' },
        { value: 4, label: '10K' },
        { value: 5, label: '100K' },
        { value: 6, label: '1M' },
        { value: 7, label: '10M' },
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
        if (diagSum === 3){
            setResultText("Player ‘X' Wins!");
            return;
        } else if (diagSum === -3){
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
        console.log(qTable);
        let action = actions[rowIndex][colIndex];
        let key = `((${board.flat().join(', ')}), ${action})`;
        console.log(key);
        if (qTable.hasOwnProperty(key)) {
            return qTable[key].toFixed(5);
        } else {
            return "?";
        }
    };

    const handleTableChange = (event: any, newValue: number) => {
        if (newValue === 1) {
            setQTable(qTable10);
        } else if (newValue === 2) {
            setQTable(qTable100);
        } else if (newValue === 3) {
            setQTable(qTable1000);
        } else if (newValue === 4) {
            setQTable(qTable10000);
        } else if (newValue === 5) {
            setQTable(qTable100000);
        } else if (newValue === 6) {
            setQTable(qTable1000000);
        } else if (newValue === 7) {
            setQTable(qTable10000000);
        }
    };

    return (
        <div className='content'>
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
            <button className='btn-glitch ai-move-btn'>
                Make AI Move
            </button>
            <div className='q-table-slider'>
                <Typography 
                    style={fontStyle}
                >
                    Number of episodes (games) trained:
                </Typography>
                <Slider 
                    min={1}
                    max={7}
                    defaultValue={7}
                    step={1}
                    marks={marks}
                    sx={CustomSliderStyles}
                    onChange={handleTableChange}
                    valueLabelDisplay="off"
                    valueLabelFormat={(value:any) => marks.find(mark => mark.value === value)?.label || ''}
                />
            </div>
        </div>
    )
}

export default TicTacToeGame;