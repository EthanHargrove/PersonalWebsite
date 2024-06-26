import React from "react";
import { Grid, Typography } from "@mui/material";

interface SudokuCellProps {
  position: string;
  number: number;
  notes: number[];
  notesChanges: number[];
  starting: boolean;
}
const SudokuCell: React.FC<SudokuCellProps> = (props) => {
  let { position, number, notes, notesChanges, starting } = props;

  const grid = Array.from({ length: 3 }, () => Array(3).fill(0));

  const getNoteFontStyle = (noteChaged: number) => {
    if (noteChaged === -1) {
      return {
        fontFamily: "SpaceGrotesk",
        color: "#b7b7b7",
        border: "1px solid #FF1493",
        borderRadius: "10px",
        fontSize: "10px",
        marginBottom: "-4px",
        marginTop: "-4px",
      };
    } else if (noteChaged === 1) {
      return {
        fontFamily: "SpaceGrotesk",
        color: "#b7b7b7",
        border: "1px solid #00FF00",
        borderRadius: "10px",
        fontSize: "10px",
        marginBottom: "-4px",
        marginTop: "-4px",
      };
    } else {
      return {
        fontFamily: "SpaceGrotesk",
        color: "#b7b7b7",
        fontSize: "10px",
        marginBottom: "-4px",
        marginTop: "-4px",
      };
    }
  };

  const getNumberFontStyle = () => {
    if (starting) {
      return {
        fontFamily: "SpaceGrotesk",
        color: "#d3d3d3",
        fontSize: "26px",
      };
    } else {
      return {
        fontFamily: "SpaceGrotesk",
        color: "#FFD700",
        fontSize: "26px",
      };
    }
  };

  const numberFontStyle = getNumberFontStyle();

  const width: string = "50px";
  const middleWidth: string = "53px";
  const height: string = "50px";
  const borderType: string = "2px solid #b7b7b7";

  const getBorderStyle = () => {
    if (position === "topLeft") {
      return {
        width: width,
        height: height,
        borderBottom: borderType,
        padding: "0px",
      };
    } else if (position === "topMiddle") {
      return {
        width: middleWidth,
        height: height,
        borderRight: borderType,
        borderBottom: borderType,
        borderLeft: borderType,
        padding: "0px",
      };
    } else if (position === "topRight") {
      return {
        width: width,
        height: height,
        borderBottom: borderType,
        padding: "0px",
      };
    } else if (position === "middleLeft") {
      return {
        width: width,
        height: height,
        padding: "0px",
      };
    } else if (position === "middleMiddle") {
      return {
        width: middleWidth,
        height: height,
        borderLeft: borderType,
        borderRight: borderType,
        padding: "0px",
      };
    } else if (position === "middleRight") {
      return {
        width: width,
        height: height,
        padding: "0px",
      };
    } else if (position === "bottomLeft") {
      return {
        width: width,
        height: height,
        borderTop: borderType,
        padding: "0px",
      };
    } else if (position === "bottomMiddle") {
      return {
        width: middleWidth,
        height: height,
        borderTop: borderType,
        borderRight: borderType,
        borderLeft: borderType,
        padding: "0px",
      };
    } else if (position === "bottomRight") {
      return {
        width: width,
        height: height,
        borderTop: borderType,
        padding: "0px",
      };
    } else {
      return {
        width: width,
        height: height,
        padding: "0px",
      };
    }
  };

  const borderStyle = getBorderStyle();

  return (
    <Grid container spacing={0} style={borderStyle} className="sudokuCell">
      {number !== 0 ? (
        <Grid
          item
          style={{
            display: "flex",
            width: width,
            height: height,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography style={numberFontStyle}>{number}</Typography>
        </Grid>
      ) : (
        grid.map((row, rowIndex) => (
          <Grid
            container
            item
            key={rowIndex}
            spacing={1.25}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {row.map((note, colIndex) => (
              <Grid
                item
                key={colIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="noteCell"
              >
                <Typography
                  style={getNoteFontStyle(
                    notesChanges[3 * rowIndex + colIndex]
                  )}
                >
                  {notes[3 * rowIndex + colIndex] === 1
                    ? 3 * rowIndex + colIndex + 1
                    : ""}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default SudokuCell;
