import numpy as np
import polars as pl

def generate_sudoku():
    df = pl.read_csv("sudoku.csv", dtypes={'quizzes': str})
    row_index = np.random.randint(low=0, high=1_000_000)
    puzzle = np.array(list(df["quizzes"][row_index])).reshape((9,9)).astype(int)
    return puzzle

def update_notes(puzzle, notes):
    puzzle = np.array(puzzle, dtype=int).reshape((9,9))
    notes = np.array(notes, dtype=int).reshape((9,9,9))

    for i, row in enumerate(puzzle):
        for j, num in enumerate(row):
            if 0 < num < 10:
                # Remove row notes
                notes[i, :, num-1] = 0
                # Remove column notes
                notes[:, j, num-1] = 0
                # Remove box notes
                start_row = 3 * (i // 3)
                start_col = 3 * (j // 3)
                notes[start_row:start_row+3, start_col:start_col+3, num-1] = 0
    
    return notes
