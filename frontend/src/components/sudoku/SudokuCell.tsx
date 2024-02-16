import React from 'react';
import { Grid, Typography } from '@mui/material';

interface SudokuCellProps {
  position: string,
  number: number,
  notes: string[][],
  starting: boolean,
}
const SudokuCell: React.FC<SudokuCellProps> = (props) => {
  let { position, number, notes, starting } = props;

  const noteFontStyle = {
    fontFamily: 'SpaceGrotesk',
    color: '#b7b7b7',
    fontSize: '10px',
    marginBottom: '-4px',
    marginTop: '-4px',
  };
  
  const getNumberFontStyle = () => {
    if (starting){
      return {
        fontFamily: 'SpaceGrotesk',
        color: '#d3d3d3',
        fontSize: '26px',
      };
    } else {
      return {
        fontFamily: 'SpaceGrotesk',
        color: '#FFD700',
        fontSize: '26px',
      };
    }
  }

  const numberFontStyle = getNumberFontStyle();

  const width: string = '50px';
  const middleWidth: string = "53px";
  const height: string = '50px';
  const borderType: string = '2px solid #b7b7b7';

  const getBorderStyle = () => {
    if (position === "topLeft") {
      return {
        width: width,
        height: height,
        borderBottom: borderType,
        padding: '0px',
      };
    } else if (position === "topMiddle") {
      return {
        width: middleWidth,
        height: height,
        borderRight: borderType,
        borderBottom: borderType,
        borderLeft: borderType,
        padding: '0px',
      };
    } else if (position === "topRight") {
      return {
        width: width,
        height: height,
        borderBottom: borderType,
        padding: '0px',
      };
    } else if (position === "middleLeft") {
      return {
        width: width,
        height: height,
        padding: '0px',
      };
    } else if (position === "middleMiddle") {
      return {
        width: middleWidth,
        height: height,
        borderLeft: borderType,
        borderRight: borderType,
        padding: '0px',
      };
    } else if (position === "middleRight") {
      return {
        width: width,
        height: height,
        padding: '0px',
      };
    } else if (position === "bottomLeft") {
      return {
        width: width,
        height: height,
        borderTop: borderType,
        padding: '0px',
      };
    } else if (position === "bottomMiddle") {
      return {
        width: middleWidth,
        height: height,
        borderTop: borderType,
        borderRight: borderType,
        borderLeft: borderType,
        padding: '0px',
      };
    } else if (position === "bottomRight") {
      return {
        width: width,
        height: height,
        borderTop: borderType,
        padding: '0px',
      };
    } else {
      return {
        width: width,
        height: height,
        padding: '0px',
      };
    }
  }

  const borderStyle = getBorderStyle();

  return (
    <Grid container spacing={0} style={borderStyle} className='sudokuCell'>
      {number !== 0 ? <Grid item style={{ display: 'flex', width: width, height: height, justifyContent: 'center', alignItems: 'center' }}><Typography style={numberFontStyle}>{number}</Typography></Grid> : notes.map((row, rowIndex) => (
        <Grid container item key={rowIndex} spacing={1.25} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {row.map((note, colIndex) => (
            <Grid item key={colIndex} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='noteCell'>
              <Typography style={noteFontStyle}>{note}</Typography>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default SudokuCell;