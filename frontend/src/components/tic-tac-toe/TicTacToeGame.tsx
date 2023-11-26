// External imports
import React, { useState } from 'react';
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
    let gridCenterX = 0;
    let gridCenterY = 0;
    let gridDepth = 60;
    let gridArmLength = 200;
    let gridArmWidth = 20;
    let squareDist = gridArmLength + gridArmWidth;

    let pieceDepth = 32;
    let xArmLength = 40;
    let xArmWidth = 10;

    const [qTable, setQTable] = useState<{[key: string]: number}>(qTable10000000);
    const [showVals, setShowVals] = useState(false);
    const actions = [[0,1,2],[3,4,5],[6,7,8]];
    const [board, setBoard] = useState<number[][]>([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const rowYVals = [gridCenterY+squareDist, gridCenterY, gridCenterY-squareDist];
    const colXVals = [gridCenterX-squareDist, gridCenterX, gridCenterX+squareDist];
    const rowYText = [1.35, 0.05, -1.35];
    const colXText = [-1.35, 0, 1.35];

    const marks = [
        { value: 1, label: '10'},
        { value: 2, label: '100' },
        { value: 3, label: '1K' },
        { value: 4, label: '10K' },
        { value: 5, label: '100K' },
        { value: 6, label: '1M' },
        { value: 7, label: '10M' },
    ];

    const resetGame = () => {
        setBoard([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
        setCurrentPlayer(1);
    };

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

    return (
        <div className='content'>
            <Canvas>
                <ambientLight intensity={1}/>
                <spotLight position={[-10, 10, 10]} angle={15} penumbra={1} intensity={300} castShadow />
                <group>
                    <TicTacToeGrid x={gridCenterX} y={gridCenterY} armLength={gridArmLength} armWidth={gridArmWidth} depth={gridDepth} />
                    {/* loop over each row */}
                    {board.map((row, rowIndex: number) => (
                        // loop over each column in the row
                        row.map((piece, colIndex: number) => (
                            piece === 1 ? (<XPiece x={colXVals[colIndex]} y={rowYVals[rowIndex]} armLength={xArmLength} armWidth={xArmWidth} depth={pieceDepth} />)
                            : piece === -1 ? (<OPiece x={colXVals[colIndex]} y={rowYVals[rowIndex]} radius={xArmLength} width={xArmWidth} depth={pieceDepth} />)
                            : showVals ? (<ThreeText x={colXText[colIndex]} y={rowYText[rowIndex]} z={0.175} value={getQValue(rowIndex, colIndex)} />)
                            : (<EmptySquare x={colXVals[colIndex]} y={rowYVals[rowIndex]} gridArmLength={gridArmLength} depth={pieceDepth} row={rowIndex} col={colIndex} board={board} setBoard={setBoard} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>)
                        ))
                    ))}
                </group>
            </Canvas>
            <button className='btn-glitch reset-btn' onClick={resetGame}>
                Reset Game
            </button>
            <button className='btn-glitch values-btn' onClick={() => setShowVals(!showVals)}>
                Show Q-Values
            </button>
            <button className='btn-glitch ai-move-btn'>
                Make AI Move
            </button>
            <div className='q-table-slider'>
                <Typography>
                    Number of episodes (games) trained:
                </Typography>
                <Slider 
                    min={1}
                    max={7}
                    defaultValue={7}
                    step={1}
                    marks={marks} 
                    valueLabelDisplay="on"
                    valueLabelFormat={(value:any) => marks.find(mark => mark.value === value)?.label || ''}
                />
            </div>
        </div>
    )
}

export default TicTacToeGame;