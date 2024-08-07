// External imports
import React, { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";

// Internal imports
import "../../styles/main.css";
import "../../styles/sudoku.css";
import SudokuBoard from "./SudokuBoard";
import { apiCall } from "../../api/api";

function SudokuGame() {
  const [toNote, setToNote] = useState<boolean>(false);
  const [toUpdate, setToUpdate] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>("start");

  const [startingPuzzle, setStartingPuzzle] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [puzzle, setPuzzle] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [newPuzzle, setNewPuzzle] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  const initialNotes: number[][][] = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 1))
  );

  const initialNotesChanges: number[][][] = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0))
  );

  const [notes, setNotes] = useState(initialNotes);
  const [newNotes, setNewNotes] = useState(initialNotes);
  const [notesChanges, setNotesChanges] = useState(initialNotesChanges);

  useEffect(() => {
    apiCall("sudoku/generate").then((response: any) => {
      if (response) {
        setStartingPuzzle(response.puzzle);
        setPuzzle(response.puzzle);
      } else {
        console.log("no response");
      }
    });
  }, []);

  const generateSudoku = () => {
    apiCall("sudoku/generate").then((response: any) => {
      if (response) {
        setStartingPuzzle(response.puzzle);
        setPuzzle(response.puzzle);
        setNotes(initialNotes);
        setNotesChanges(initialNotesChanges);
        setToNote(false);
        setCurrentStep("");
      } else {
        console.log("no response");
      }
    });
  };

  const updateNotes = () => {
    setNotes(newNotes);
    setNotesChanges(initialNotesChanges);
    setToNote(false);
    if (
      !["pointingGroups", "nakedPairs", "hiddenPairs"].includes(currentStep)
    ) {
      setCurrentStep("noted");
    }
  };

  const updateCells = () => {
    setPuzzle(newPuzzle);
    setNotesChanges(initialNotesChanges);
    setToUpdate(false);
  };

  const getNewNotes = async () => {
    const body = {
      puzzle: puzzle,
      notes: notes,
    };

    try {
      const response = await apiCall("sudoku/update_notes", "POST", body);

      if (response) {
        setNewNotes(response.notes);
        setNotesChanges(response.changes);
        setToNote(response.numChanges > 0);
        setCurrentStep("");
        return response.numChanges;
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.error("Error in getNewNotes:", error);
    }
  };

  const nakedSingles = async () => {
    const body = {
      puzzle: puzzle,
      notes: notes,
    };
    try {
      const response = await apiCall("sudoku/naked_singles", "POST", body);

      if (response) {
        setNewPuzzle(response.puzzle);
        setNotesChanges(response.changes);
        setToUpdate(response.numChanges > 0);
        setCurrentStep("nakedSingles");
        return response.numChanges;
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.error("Error in nakedSingles:", error);
    }
  };

  const hiddenSingles = async () => {
    const body = {
      puzzle: puzzle,
      notes: notes,
    };
    try {
      const response = await apiCall("sudoku/hidden_singles", "POST", body);

      if (response) {
        setNewPuzzle(response.puzzle);
        setNotesChanges(response.changes);
        setToUpdate(response.numChanges > 0);
        setCurrentStep("hiddenSingles");
        return response.numChanges;
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.error("Error in hiddenSingles:", error);
    }
  };

  const pointingGroups = async () => {
    const body = {
      puzzle: puzzle,
      notes: notes,
    };
    try {
      const response = await apiCall("sudoku/pointing_groups", "POST", body);

      if (response) {
        setNewNotes(response.notes);
        setNotesChanges(response.changes);
        setToNote(response.numChanges > 0);
        setCurrentStep("pointingGroups");
        return response.numChanges;
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.error("Error in pointingGroups:", error);
    }
  };

  const nakedPairs = async () => {
    const body = {
      puzzle: puzzle,
      notes: notes,
    };
    try {
      const response = await apiCall("sudoku/naked_pairs", "POST", body);

      if (response) {
        setNewNotes(response.notes);
        setNotesChanges(response.changes);
        setToNote(response.numChanges > 0);
        setCurrentStep("nakedPairs");
        return response.numChanges;
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.error("Error in nakedPairs:", error);
    }
  };

  const hiddenPairs = async () => {
    const body = {
      puzzle: puzzle,
      notes: notes,
    };
    try {
      const response = await apiCall("sudoku/hidden_pairs", "POST", body);

      if (response) {
        setNewNotes(response.notes);
        setNotesChanges(response.changes);
        setToNote(response.numChanges > 0);
        setCurrentStep("hiddenPairs");
        return response.numChanges;
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.error("Error in hiddenPairs:", error);
    }
  };

  const handleStep = async () => {
    if (toNote) {
      updateNotes();
    } else if (toUpdate) {
      updateCells();
    } else {
      let result;

      result = await getNewNotes();
      if (result !== 0) return;

      result = await nakedSingles();
      if (result !== 0) return;

      result = await hiddenSingles();
      if (result !== 0) return;

      result = await nakedPairs();
      if (result !== 0) return;

      result = await hiddenPairs();
      if (result !== 0) return;

      result = await pointingGroups();
      if (result !== 0) return;

      setCurrentStep("moreAdvanced");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Grid
        container
        spacing={0}
        style={{
          marginTop: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={7} lg={7}>
          <Stack
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            spacing={2}
          >
            <SudokuBoard
              puzzle={puzzle}
              startingPuzzle={startingPuzzle}
              notes={notes}
              notesChanges={notesChanges}
            />
            <Stack direction="row" spacing={5}>
              <button
                className="btn-glitch puzzle-btn"
                onClick={generateSudoku}
              >
                Random Puzzle
              </button>
              <button className="btn-glitch step-btn" onClick={handleStep}>
                Next Step
              </button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ol>
            <li className={`${currentStep === "" ? "currentStep" : ""}`}>
              Update Notes
            </li>
            <ul>
              <li className={`${currentStep === "noted" ? "currentStep" : ""}`}>
                Update
              </li>
            </ul>
            <li
              className={`${
                currentStep === "nakedSingles" && toUpdate ? "currentStep" : ""
              }`}
            >
              Naked Singles
            </li>
            <ul>
              <li
                className={`${
                  currentStep === "nakedSingles" && !toUpdate
                    ? "currentStep"
                    : ""
                }`}
              >
                Update
              </li>
            </ul>
            <li
              className={`${
                currentStep === "hiddenSingles" && toUpdate ? "currentStep" : ""
              }`}
            >
              Hidden Singles
            </li>
            <ul>
              <li
                className={`${
                  currentStep === "hiddenSingles" && !toUpdate
                    ? "currentStep"
                    : ""
                }`}
              >
                Update
              </li>
            </ul>
            <li
              className={`${
                currentStep === "nakedPairs" && toNote ? "currentStep" : ""
              }`}
            >
              {" "}
              Naked Pairs
            </li>
            <ul>
              <li
                className={`${
                  currentStep === "nakedPairs" && !toNote ? "currentStep" : ""
                }`}
              >
                Update
              </li>
            </ul>
            <li
              className={`${
                currentStep === "hiddenPairs" && toNote ? "currentStep" : ""
              }`}
            >
              {" "}
              Hidden Pairs
            </li>
            <ul>
              <li
                className={`${
                  currentStep === "hiddenPairs" && !toNote ? "currentStep" : ""
                }`}
              >
                Update
              </li>
            </ul>
            <li
              className={`${
                currentStep === "pointingGroups" && toNote ? "currentStep" : ""
              }`}
            >
              {" "}
              Pointing Groups
            </li>
            <ul>
              <li
                className={`${
                  currentStep === "pointingGroups" && !toNote
                    ? "currentStep"
                    : ""
                }`}
              >
                Update
              </li>
            </ul>
            <li
              className={`${
                currentStep === "moreAdvanced" ? "currentStep" : ""
              }`}
            >
              {" "}
              More Advanced Methods Required
            </li>
          </ol>
        </Grid>
      </Grid>
      {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Stack
          style={{
            width: "50vw",
            marginTop: "10vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SudokuBoard
            puzzle={puzzle}
            startingPuzzle={startingPuzzle}
            notes={notes}
            notesChanges={notesChanges}
          />
          <div className="d-flex justify-content-center align-items-center">
            {/* <div> */}
      {/* <button className="btn-glitch puzzle-btn" onClick={generateSudoku}>
              Random Puzzle
            </button>
            <button className="btn-glitch step-btn" onClick={handleStep}>
              Next Step
            </button>
          </div>
        </Stack>
        <h1>Hi</h1>
      </Stack> */}
    </div>
  );
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
