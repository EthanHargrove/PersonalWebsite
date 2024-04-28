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
    num_changes = 0

    for i, row in enumerate(puzzle):
        for j, num in enumerate(row):
            # If cell is filled, remove all notes
            if puzzle[i, j] != 0:
                new_notes[i, j, :] = 0
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

    changes = new_notes - notes

    num_changes += -1 * np.sum(changes)

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
            row_ind = naked_single[0]
            col_ind = naked_single[1]
            if new_puzzle[row_ind, col_ind] == 0:
                num_ind = np.argwhere(notes[row_ind, col_ind] == 1)[0][0]
                new_puzzle[row_ind, col_ind] = num_ind + 1
                changes[row_ind, col_ind, num_ind] = 1
                num_changes += 1
    except:
        pass

    return new_puzzle, changes, num_changes


def hidden_singles(puzzle, notes):
    """
    Checks for hidden singles (one possible cell for a candidate).

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

    # Check rows
    for row_ind, row in enumerate(notes):
        hidden_singles = np.argwhere(np.sum(row, axis=0) == 1)

        if len(hidden_singles) == 0:
            continue

        for single in hidden_singles:
            num_ind = single[0]
            col_ind = np.argwhere(notes[row_ind, :, num_ind] == 1)[0][0]
            if new_puzzle[row_ind, col_ind] == 0:
                new_puzzle[row_ind, col_ind] = num_ind + 1
                changes[row_ind, col_ind, num_ind] = 1
                num_changes += 1

    # Check cols
    for col_ind in range(9):
        hidden_singles = np.argwhere(np.sum(notes[:, col_ind, :], axis=0) == 1)

        if len(hidden_singles) == 0:
            continue

        for single in hidden_singles:
            num_ind = single[0]
            row_ind = np.argwhere(notes[:, col_ind, num_ind] == 1)[0][0]
            if new_puzzle[row_ind, col_ind] == 0:
                new_puzzle[row_ind, col_ind] = num_ind + 1
                changes[row_ind, col_ind, num_ind] = 1
                num_changes += 1

    # Check boxes
    for row_start in [0, 3, 6]:
        for col_start in [0, 3, 6]:
            for num_ind in range(9):
                num_poss = np.sum(
                    notes[row_start : row_start + 3, col_start : col_start + 3, num_ind]
                )
                if num_poss != 1:
                    continue

                inds = np.argwhere(
                    notes[row_start : row_start + 3, col_start : col_start + 3, num_ind]
                    == 1
                )[0]
                row_ind = row_start + inds[0]
                col_ind = col_start + inds[1]
                if new_puzzle[row_ind, col_ind] == 0:
                    new_puzzle[row_ind, col_ind] = num_ind + 1
                    changes[row_ind, col_ind, num_ind] = 1
                    num_changes += 1

    return new_puzzle, changes, num_changes


def pointing_groups(puzzle, notes):
    """
    Checks for pointing groups (if all candidates in a box are within the same row or column).

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
    puzzle = np.array(puzzle, dtype=int).reshape((9, 9))
    notes = np.array(notes, dtype=int).reshape((9, 9, 9))
    new_notes = notes.copy()
    num_changes = 0

    for row_start in [0, 3, 6]:
        for col_start in [0, 3, 6]:
            box = puzzle[row_start : row_start + 3, col_start : col_start + 3]
            box_notes = new_notes[
                row_start : row_start + 3, col_start : col_start + 3, :
            ]
            for num_ind in range(9):
                if num_ind + 1 in box:
                    continue
                poss_cells = np.argwhere((box_notes[:, :, num_ind] == 1) & (box == 0))
                poss_cells_rows, poss_cells_cols = poss_cells[:, 0], poss_cells[:, 1]

                if len(np.unique(poss_cells_rows)) == 1:
                    row_ind = poss_cells_rows[0]
                    for col_ind, poss in enumerate(
                        new_notes[row_start + row_ind, :, num_ind]
                    ):
                        if (poss == 0) or (col_start <= col_ind <= col_start + 2):
                            continue
                        new_notes[row_start + row_ind, col_ind, num_ind] = 0

                elif len(np.unique(poss_cells_cols)) == 1:
                    col_ind = poss_cells_cols[0]
                    for row_ind, poss in enumerate(
                        new_notes[:, col_start + col_ind, num_ind]
                    ):
                        if (poss == 0) or (row_start <= row_ind <= row_start + 2):
                            continue
                        new_notes[row_ind, col_start + col_ind, num_ind] = 0

    changes = new_notes - notes
    num_changes += -1 * np.sum(changes)

    return new_notes, changes, num_changes


# def naked_pairs(puzzle, notes):
#     """
#     Checks for naked pairs (two cells in the same row/column/box with the same two possible candidates).

#     Input
#         puzzle : 9x9 list of ints
#             Current state of sudoku puzzle.
#         notes : 9x9x9 list of boolean integers
#             hello

#     Output
#         new_puzzle : 9x9 np array of ints
#             Updated sudoku puzzle.
#         changes : 9x9x9 np array of boolean integers
#             there
#     """
#     puzzle = np.array(puzzle, dtype=int).reshape((9, 9))
#     new_notes = np.array(notes, dtype=int).reshape((9, 9, 9))
#     changes = np.zeros((9, 9, 9), dtype=int)
#     num_changes = 0

#     # Check rows
#     for row_ind, row in enumerate(new_notes):
#         # Find indices of columns with only two possibilities
#         col_inds = np.argwhere(np.sum(row, axis=1) == 2).flatten()
#         # Check if any of them have identical possibilities
#         if len(col_inds) < 2:
#             continue
#         for col_ind1 in col_inds:
#             for col_ind2 in col_inds:
#                 if col_ind1 == col_ind2:
#                     continue
#                 if new_notes[row_ind, col_ind1, :] == new_notes[row_ind, col_ind2, :]:
#                     num_inds = np.argwhere(
#                         new_notes[row_ind, col_ind1, :] == 1
#                     ).flatten()
#                     for col_ind in range(9):
#                         if (
#                             (col_ind != col_ind1)
#                             and (col_ind != col_ind2)
#                             and (
#                                 (new_notes[row_ind, col_ind, num_inds[0]] == 1)
#                                 or (new_notes[row_ind, col_ind, num_inds[1]] == 1)
#                             )
#                         ):
#                             new_notes[row_ind, col_ind, num_inds[0]] = 0
#                             changes[row_ind, col_ind, num_inds[0]] = -1

#                             new_notes[row_ind, col_ind, num_inds[1]] = 0
#                             changes[row_ind, col_ind, num_inds[1]] = -1

#                             changes[row_ind, col_ind1, num_inds[0]] = 1
#                             changes[row_ind, col_ind1, num_inds[1]] = 1
#                             changes[row_ind, col_ind2, num_inds[0]] = 1
#                             changes[row_ind, col_ind2, num_inds[1]] = 1

#                             num_changes += 1
