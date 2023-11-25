import React, { useEffect, useState } from 'react';
import { Shape } from 'three';


interface EmptySquareProps {
    x: number;
    y: number;
    gridArmLength: number;
    depth: number;
    row: number;
    col: number;
    board: number[][];
    setBoard: (board: number[][]) => void;
    currentPlayer: number;
    setCurrentPlayer: (currentPlayer: number) => void;
}

const EmptySquare: React.FC<EmptySquareProps> = (props) => {
    let { x, y, gridArmLength, depth, row, col, board, setBoard, currentPlayer, setCurrentPlayer } = props;
    const [ hovered, setHovered ] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    })

    const placePiece = () => {
        const newBoard = [...board];
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer*-1);
    };

    x = x - gridArmLength/2
    y = y + gridArmLength/2;

    const squareShape = new Shape();
    squareShape.moveTo( x, y );
    squareShape.lineTo( x+gridArmLength, y);
    squareShape.lineTo( x+gridArmLength, y-gridArmLength);
    squareShape.lineTo( x, y-gridArmLength);
    squareShape.lineTo( x, y );

    const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1,
    };

    return (
        <mesh rotation={[0, 0, 0]} scale={[0.006, 0.006, 0.006]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={placePiece}>
            <extrudeGeometry args={[squareShape, extrudeSettings]}/>
            <meshStandardMaterial color="#00FFFF" wireframe={false} visible={false} />
        </mesh>
    );
};

export default EmptySquare;