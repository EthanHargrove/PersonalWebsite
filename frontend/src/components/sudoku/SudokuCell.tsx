import React from 'react';
import { Grid, Typography } from '@mui/material';

interface SudokuCellProps {
  notes: string[][]
}
const SudokuCell: React.FC<SudokuCellProps> = ({notes}) => {
  const noteFontStyle =  {
    fontFamily: 'SpaceGrotesk',
    color: '#ffffff',
    marginBottom: '-4px',
  };

  return (
    <Grid container spacing={1}>
      {notes.map((row, rowIndex) => (
        <Grid container item key={rowIndex} spacing={1}>
          {row.map((note, colIndex) => (
            <Grid item key={colIndex}>
              <Typography style={noteFontStyle}>{note}</Typography>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default SudokuCell;