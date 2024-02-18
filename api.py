import numpy as np
from sudoku import Sudoku

def generate_sudoku():
    difficulty = np.random.rand()*0.5 + 0.25
    seed = np.random.randint(10_000)
    puzzle = Sudoku(3, seed=seed).difficulty(difficulty).board
    puzzle = [[cell if cell is not None else 0 for cell in row] for row in puzzle]
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
