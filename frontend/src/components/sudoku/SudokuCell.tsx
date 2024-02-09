import React from 'react';
import { Grid, Typography} from '@mui/material';

interface SudokuCellProps {
  notes: string[][]
}
const SudokuCell: React.FC<SudokuCellProps> = ({notes}) => {
  const noteFontStyle =  {
    fontFamily: 'SpaceGrotesk',
    color: '#b7b7b7',
    fontSize: '12px',
    marginBottom: '-4px',
    marginTop: '-4px',
  };

  const borderStyles = {
    width: '50px',
    height: '50px',
    borderTop: '2px solid #ff0000', // Red color for the top border
    borderRight: '2px solid #00ff00', // Green color for the right border
    borderBottom: '2px solid #0000ff', // Blue color for the bottom border
    borderLeft: '2px solid #ffff00', // Yellow color for the left border
    padding: '0px', 
  };

  return (
    <Grid container spacing={0} style={borderStyles} className='sudokuCell'>
      {notes.map((row, rowIndex) => (
        <Grid container item key={rowIndex} spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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