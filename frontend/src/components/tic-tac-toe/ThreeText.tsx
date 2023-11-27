import React from 'react';
import { Text } from '@react-three/drei';
import EmptySquare from './EmptySquare';

interface ThreeTextProps {
    x: number;
    y: number;
    z: number;
    value: string;
    gridArmLength: number;
    depth: number;
    row: number;
    col: number;
    board: number[][];
    setBoard: (board: number[][]) => void;
    currentPlayer: number;
    setCurrentPlayer: (currentPlayer: number) => void;
}

const ThreeText: React.FC<ThreeTextProps> = (props) => {
    let {x, y, z, value, gridArmLength, depth, row, col, board, setBoard, currentPlayer, setCurrentPlayer} = props;

    return (
        <>
            <EmptySquare x={x/0.006} y={y/0.006} gridArmLength={gridArmLength} depth={depth} row={row} col={col} visible={false} colour={"#ffffff"} board={board} setBoard={setBoard} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>
            <Text
                position={[x, y, z]}
                fontSize={0.25}
                textAlign='center'
            >
                { value }
            </Text>
        </>
    );
};

export default ThreeText;