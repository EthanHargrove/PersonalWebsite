// External imports
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'; 
// Internal imports
import "../../styles/main.css";
import "../../styles/tic-tac-toe.css";
import TicTacToeGrid from './TicTacToeGrid';
import XPiece from './XPiece';
import OPiece from './OPiece';
import ThreeText from './ThreeText';
import EmptySquare from './EmptySquare';

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

    const [showVals, setShowVals] = useState(true)
    const [board, setBoard] = useState<number[][]>([[0,0,0],[0,0,0],[0,0,0]]);
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const rowYVals = [gridCenterY+squareDist, gridCenterY, gridCenterY-squareDist]
    const colXVals = [gridCenterX-squareDist, gridCenterX, gridCenterX+squareDist]
    const rowYText = [-1.35, 0.05, 1.35]
    const colXText = [-1.35, 0, 1.35]

    const resetGame = () => {
        setBoard([[0,0,0],[0,0,0],[0,0,0]]);
        setCurrentPlayer(1);
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
                            : showVals ? (<ThreeText x={colXText[colIndex]} y={rowYText[rowIndex]} z={0.175} value={0.001} />)
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
        </div>
    )
}

export default TicTacToeGame;