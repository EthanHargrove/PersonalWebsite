import React from "react";
import { Text } from "@react-three/drei";
import EmptySquare from "./EmptySquare";

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
  scaling: number;
}

const ThreeText: React.FC<ThreeTextProps> = (props) => {
  let {
    x,
    y,
    z,
    value,
    gridArmLength,
    depth,
    row,
    col,
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    scaling,
  } = props;

  return (
    <>
      <EmptySquare
        x={x / scaling}
        y={y / scaling}
        gridArmLength={gridArmLength}
        depth={depth}
        row={row}
        col={col}
        visible={false}
        colour={"#ffffff"}
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        scaling={scaling}
      />
      <Text
        position={[x, y, z]}
        fontSize={39.2857 * scaling}
        textAlign="center"
        color="#FFFFFF"
        outlineWidth={scaling * 2}
        outlineColor="#000000"
        outlineOpacity={1.0}
      >
        {value}
      </Text>
    </>
  );
};

export default ThreeText;
