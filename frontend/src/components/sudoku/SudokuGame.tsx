// External imports
import React, { useState, useEffect } from 'react';

// Internal imports
import "../../styles/main.css";
import "../../styles/sudoku.css";
import SudokuBoard from './SudokuBoard';
import { apiCall, getPuzzle, getNotes } from '../../api/api';


function SudokuGame() {

    const [startingPuzzle, setStartingPuzzle] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
    const [puzzle, setPuzzle] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));

    const initialNotes: number[][][] = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, () => 1)
        )
    );
    const [notes, setNotes] = useState(initialNotes);

    useEffect(() => {
        apiCall('sudoku/generate').then((response: any) => {
            if (response) {
                setStartingPuzzle(getPuzzle(response));
                setPuzzle(getPuzzle(response));
            } else {
                console.log("no response");
            }
        });
    }, []);

    const generateSudoku = () => {
        apiCall('sudoku/generate').then((response: any) => {
            if (response) {
                setStartingPuzzle(getPuzzle(response));
                setPuzzle(getPuzzle(response));
                setNotes(initialNotes);
            } else {
                console.log("no response");
            }
        });
    };

    const updateNotes = () => {
        const body = {
            "puzzle": puzzle,
            "notes": notes,
        }
        apiCall('sudoku/update_notes', 'POST', body).then((response: any) => {
            if (response) {
                setNotes(getNotes(response));
            } else {
                console.log("no response");
            }
        });
    };

    return (
        <div className='content'>
            <SudokuBoard puzzle={puzzle} startingPuzzle={startingPuzzle} notes={notes}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button className='btn-glitch puzzle-btn' onClick={generateSudoku}>
                    Random Puzzle
                </button>
                <button className='btn-glitch step-btn' onClick={updateNotes}>
                    Next Step
                </button>
            </div>
        </div>
    )
}

export default SudokuGame;

//     const [board, setBoard] = useState<number[][]>(Array.from({ length: 9 }, () => Array(9).fill(0)))
//     const [notes, setNotes] = useState<number[][][]>(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => Array(9).fill(1))))
//     const [start, setStart] = useState<boolean>(true);
//     const [currentSquare, setCurrentSquare] = useState<string>("00");
//     const [toUpdate, setToUpdate] = useState<boolean>(false);
//     const [toNote, setToNote] = useState<boolean>(false);
//     const [notesToChange, setNotesToChange] = useState<string[]>([]);
//     const [currentNumber, setCurrentNumber] = useState<number>(0);
//     const [groupType, setGroupType] = useState<string>("");

//     function notesStep(rowStart: number, colStart: number): [string[], number] {
//         const notesChanged: string[] = [];
//         const num: number = board[rowStart][colStart]

//         if (board[rowStart][colStart] > 0){
//             // Check rows
//             notes[rowStart].forEach((possibilities, index) => {
//                 if (possibilities[num-1] === 1){
//                     // const newNotes = [...notes];
//                     // newNotes[rowStart][index][num-1] = 0;
//                     // setNotes(newNotes);
//                     notesChanged.push(rowStart + index + "")
//                 }
//             });

//             // Check columns
//             let column: number[][] = notes.map(depth => depth.map(row => row[colStart]))
//             column.forEach((possibilities, index) => {
//                 if (possibilities[num-1] === 1){
//                     // const newNotes = [...notes];
//                     // newNotes[index][colStart][num-1] = 0;
//                     // setNotes(newNotes);
//                     notesChanged.push(index + colStart + "");
//                 }
//             });

//             // Check boxes
//             const boxStartRow = Math.floor(rowStart / 3) * 3
//             const boxStartCol = Math.floor(colStart / 3) * 3
            
//             for (let i = boxStartRow; i < boxStartRow + 3; i++){
//                 for (let j = boxStartCol; i < boxStartCol + 3; j++){
//                     if (i !== rowStart && j !== colStart){
//                         let possibilities = notes[i][j];
//                         if (possibilities[num-1] === 1){
//                             // const newNotes = [...notes];
//                             // newNotes[i][j][num-1] = 0;
//                             // setNotes(newNotes);
//                             notesChanged.push(i + j + "");
//                         }
//                     }
//                 }
//             } 
//         }

//         // Return or recursion
//         if (notesChanged.length > 0){
//             return [notesChanged, num];
//         } else {
//             return [[], 0];
//         }
//         // } else if (colStart === 8){
//         //     return notesStep(rowStart+1, 0)
//         // } else {
//         //     return notesStep(rowStart, colStart+1)
//         // }
//     }

//     function nakedSingleStep(rowStart: number, colStart: number): number {
//         let possibilities: number[] = notes[rowStart][colStart]
//         let numPossibilities: number = possibilities.filter(num => num === 1).length

//         if (numPossibilities === 1){
//             return possibilities.indexOf(1) + 1;
//         } else {
//             return 0;
//         }
//     }

//     function findNakedSingle(): [string, number] {
//         for (let i = 0; i < 9; i++){
//             for (let j = 0; j < 9; j++){
//                 let num = nakedSingleStep(i, j);
//                 if (num > 0){
//                     let cell: string = i + j + ""
//                     return [cell, num];
//                 }
//             }
//         }
//         return ["", 0];
//     }

//     function hiddenSingleStep(num: number): [string, string] {
//         // Check rows
//         for (let i = 0; i < 9; i++){
//             let possibilities: number[] = notes[i].map(item => item[num-1]);
//             let numPossibilities: number = possibilities.filter(item => item === 1).length;
//             if (numPossibilities === 1){
//                 let colIndex: number = possibilities.indexOf(1) + 1;
//                 let cell: string = i + colIndex + "";
//                 return [cell, "row"];
//             }
//         }

//         // Check columns
//         for (let i = 0; i < 9; i++){
//             let possibilities: number[] = notes.map(row => row[i][num-1]);
//             let numPossibilities: number = possibilities.filter(item => item === 1).length;
//             if (numPossibilities === 1){
//                 let rowIndex: number = possibilities.indexOf(1) + 1;
//                 let cell: string = rowIndex + i + "";
//                 return [cell, "col"];
//             }
//         }

//         // Check boxes
//         for (let boxRowStart = 0; boxRowStart < 9; boxRowStart+=3){
//             for (let boxColStart = 0; boxColStart < 9; boxColStart+=3){
//                 let numPossibilities: number = 0;
//                 let cell: string = "";
//                 for (let boxRow = 0; boxRow < 3; boxRow++){
//                     for (let boxCol = 0; boxCol < 3; boxCol++){
//                         let row: number = boxRowStart+boxRow;
//                         let col: number = boxColStart+boxCol;
//                         if (notes[row][col][num-1] === 1){
//                             numPossibilities ++;
//                             cell = row + col + "";
//                         }
//                     }
//                 }
//                 if (numPossibilities === 1){
//                     return [cell, "box"]
//                 }
//             }
//         }
        
//         // No hidden singles
//         return ["", ""];
//     }

//     function findHiddenSingle(): [string, string, number] {
//         for (let i = 1; i < 10; i++){
//             const [cell, groupType] = hiddenSingleStep(i);
//             if (groupType.length > 0){
//                 return [cell, groupType, i];
//             }
//         }
//         return ["", "", 0];
//     }

//     function nakedGroupsStep(groupNum: number): [] {
//         // Check Rows
//         for (let rowIndex = 0; rowIndex < 9; rowIndex++){

//         }

//         // Check Columns
//         for (let colIndex = 0; colIndex < 9; colIndex++){

//         }

//         // Check Boxes
//     }

//     function hiddenGroupStep(groupNum: number): [] {
//         // Check Rows
//         for (let rowIndex = 0; rowIndex < 9; rowIndex++){
//             for (let num = 1; num < 10; num++){
//                 let numsPossibilities: number[] = notes[rowIndex].map(element => element[num-1]);
//                 if (numsPossibilities.filter(element => element === 1).length === groupNum){

//                 }
//             }
//         }

//         // Check Columns
//         for (let colIndex = 0; colIndex < 9; colIndex++){

//         }

//         // Check Boxes
//     }

//     function pointingGroupStep(num: number): [string[], string[]] {
//         for (let boxRowStart = 0; boxRowStart < 9; boxRowStart+=3){
//             for (let boxColStart = 0; boxColStart < 9; boxColStart+=3){
//                 let rows: number[] = [];
//                 let cols: number[] = [];
//                 let groupMembers: string[] = [];
//                 for (let rowStart = 0; rowStart < 3; rowStart++){
//                     for (let colStart = 0; colStart < 3; colStart++){
//                         if (notes[boxRowStart+rowStart][boxColStart+colStart][num-1]){
//                             rows.push(boxRowStart+rowStart);
//                             cols.push(boxColStart+colStart);
//                             groupMembers.push(rows[-1] + cols[-1] + "");
//                         }
//                     }
//                 }
//                 if (rows.length > 0 && rows.every((element, index, array) => element === array[0])){
//                     let erasures: string[] = [];
//                     for (let colIndex = 0; colIndex < 9; colIndex++){
//                         if (colIndex < boxColStart || colIndex > boxColStart+3){
//                             if (notes[rows[0]][colIndex][num-1] === 1){
//                                 erasures.push(rows[0] + colIndex + "");
//                             }
//                         }
//                     }
//                     if (erasures.length > 0){
//                         return [groupMembers, erasures];
//                     }
//                 }
//                 if (cols.length > 0 && cols.every((element, index, array) => element === array[0])){
//                     let erasures: string[] = [];
//                     for (let rowIndex = 0; rowIndex < 9; rowIndex++){
//                         if (rowIndex < boxRowStart || rowIndex > boxRowStart+3){
//                             if (notes[rowIndex][cols[0]][num-1] === 1){
//                                 erasures.push(rowIndex + cols[0] + "");
//                             }
//                         }
//                     }
//                     if (erasures.length > 0){
//                         return [groupMembers, erasures];
//                     }
//                 }
//             }
//         }
//         return [[],[]];
//     }

//     function findPointingGroups(): [string[], string[], number] {
//         for (let num = 1; num < 10; num++){
//             const [groupMembers, erasures] = pointingGroupStep(num);
//             if (erasures.length > 0){
//                 return [groupMembers, erasures, num];
//             }
//         }
//         return [[],[],0];
//     }

//     function step() {
//         if (toUpdate){
//             // Fill in a cell
//             let newBoard = [...board];
//             newBoard[currentSquare.charCodeAt(0)][currentSquare.charCodeAt(1)] = currentNumber;
//             setBoard(newBoard);
//             setToUpdate(false);
//             setCurrentNumber(0);
//             setGroupType("");
//             return;
//         } 

//         if (toNote){
//             // Updates notes
//             let newNotes = [...notes];
//             notesToChange.forEach((cell, ind) => {
//                 let noteRow: number = cell.charCodeAt(0)
//                 let noteCol: number = cell.charCodeAt(1)
//                 newNotes[noteRow][noteCol][currentNumber-1] = 0
//             });
//             setNotes(newNotes);
//             setToNote(false);
//             setNotesToChange([]);
//             setCurrentNumber(0);
//             setGroupType("");
//             return;
//         }

//         // Create initial possibility notes
//         if (start){
//             let currentRow: number = currentSquare.charCodeAt(0);
//             let currentCol: number = currentSquare.charCodeAt(1);
//             if (board[currentRow][currentCol] > 0){
//                 const [notesChanged, num] = notesStep(currentRow, currentCol);
//                 if (notesChanged.length > 0){
//                     setToNote(true);
//                     setNotesToChange(notesChanged);
//                     setCurrentNumber(num);
//                     // Move to next square
//                     if (currentCol < 8){
//                         currentCol++;
//                         setCurrentSquare(currentRow + currentCol + "");
//                     } else if (currentRow < 8){
//                         currentRow++;
//                         setCurrentSquare(currentRow + 0 + "");
//                     } else {
//                         setStart(false);
//                         setCurrentSquare("00");
//                     }
//                     return;
//                 }
//             }

//             // Move to next square
//             if (currentCol < 8){
//                 currentCol++;
//                 setCurrentSquare(currentRow + currentCol + "");
//             } else if (currentRow < 8){
//                 currentRow++;
//                 setCurrentSquare(currentRow + 0 + "");
//             } else {
//                 setStart(false);
//                 setCurrentSquare("00");
//             }
//             return step();
//         }

//         // Look for a naked single
//         let [nakedCell1, nakedNum1] = findNakedSingle();
//         if (nakedNum1 > 0){
//             setCurrentSquare(nakedCell1);
//             setCurrentNumber(nakedNum1);
//             setToUpdate(true);
//             return;
//         }

//         // Look for a hidden single
//         let [hiddenCell1, hiddenGroupType1, hiddenNum1] = findHiddenSingle();
//         if (hiddenNum1 > 0){
//             setCurrentSquare(hiddenCell1);
//             setCurrentNumber(hiddenNum1);
//             setGroupType(hiddenGroupType1);
//             setToUpdate(true);
//             return;
//         }

//         // Look for a naked pair

//         // Look for a hidden pair

//         // Look for a pointing group

//         // Look for naked or hidden groups

//     }

//     return (
//         <div className='content'>
            
//         </div>
//     )
// }

// export default SudokuGame;

// export {}