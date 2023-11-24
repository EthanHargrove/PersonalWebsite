// External imports
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'; 
// Internal imports
import "../styles/main.css";
import "../styles/tic-tac-toe.css";
import TicTacToeGrid from '../components/TicTacToeGrid';
import XPiece from '../components/XPiece';
import OPiece from '../components/OPiece';
import ThreeText from '../components/ThreeText';

function TicTacToe() {
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
    const [board, setBoard] = useState([[1,0,1],[0,-1,0],[1,0,-1]]);
    const rowYVals = [gridCenterY+squareDist, gridCenterY, gridCenterY-squareDist]
    const colXVals = [gridCenterX-squareDist, gridCenterX, gridCenterX+squareDist]
    const rowYText = [-1.35, 0.05, 1.35]
    const colXText = [-1.35, 0, 1.35]

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas>
                <ambientLight intensity={0.5}/>
                <spotLight position={[-10, 10, 10]} angle={15} penumbra={1} intensity={300} castShadow />
                <group>
                    <TicTacToeGrid x={gridCenterX} y={gridCenterY} armLength={gridArmLength} armWidth={gridArmWidth} depth={gridDepth} />
                    {/* loop over each row */}
                    {board.map((row, rowIndex: number) => (
                        // loop over each column in the row
                        row.map((piece, colIndex: number) => (
                            piece === 1 ? (<XPiece x={colXVals[colIndex]} y={rowYVals[rowIndex]} armLength={xArmLength} armWidth={xArmWidth} depth={pieceDepth}/>)
                            : piece === -1 ? (<OPiece x={colXVals[colIndex]} y={rowYVals[rowIndex]} radius={xArmLength} width={xArmWidth} depth={pieceDepth}/>)
                            : showVals ? (<ThreeText x={colXText[colIndex]} y={rowYText[rowIndex]} z={0.175} value={0.001}/>)
                            : null
                        ))
                    ))}
                </group>
            </Canvas>
            <button className='btn-glitch values-btn' onClick={() => setShowVals(!showVals)}>
                Show Values
            </button>
            <button className='btn-glitch ai-move-btn'>
                Make AI Move
            </button>
        </div>
    )
}

export default TicTacToe;