import numpy as np
import polars as pl


def generate_sudoku():
    df = pl.read_parquet("sudoku.parquet")
    row_index = np.random.randint(low=0, high=284_905)
    puzzle = np.array(list(df["puzzle"][row_index])).reshape((9, 9)).astype(int)
    return puzzle


def update_notes(puzzle, notes):
    puzzle = np.array(puzzle, dtype=int).reshape((9, 9))
    notes = np.array(notes, dtype=int).reshape((9, 9, 9))
    new_notes = notes.copy()

    for i, row in enumerate(puzzle):
        for j, num in enumerate(row):
            if 0 < num < 10:
                # Remove row notes
                new_notes[i, :, num - 1] = 0
                # Remove column notes
                new_notes[:, j, num - 1] = 0
                # Remove box notes
                start_row = 3 * (i // 3)
                start_col = 3 * (j // 3)
                new_notes[
                    start_row : start_row + 3, start_col : start_col + 3, num - 1
                ] = 0

    changes = notes - new_notes

    num_changes = np.sum(changes)
    print(num_changes)

    return new_notes, changes, num_changes


def naked_singles(puzzle, notes):
    """
    Checks for naked singles (one possible candidate for a cell).

    Input
        puzzle : 9x9 list of ints
            Current state of sudoku puzzle.
        notes : 9x9x9 list of boolean integers
            hello

    Output
        new_puzzle : 9x9 np array of ints
            Updated sudoku puzzle.
        changes : 9x9x9 np array of boolean integers
            there
    """
    new_puzzle = np.array(puzzle, dtype=int).reshape((9, 9))
    notes = np.array(notes, dtype=int).reshape((9, 9, 9))
    changes = np.zeros((9, 9, 9), dtype=int)
    num_changes = 0

    try:
        naked_singles = np.argwhere(np.sum(notes, axis=2) == 1)
        for naked_single in naked_singles:
            row = naked_single[0]
            col = naked_single[1]
            if new_puzzle[row, col] == 0:
                num = np.argwhere(notes[row, col] == 1)[0][0]
                new_puzzle[row, col] = num + 1
                changes[row, col, num] = 1
                num_changes += 1
    except:
        pass

    return new_puzzle, changes, num_changes
