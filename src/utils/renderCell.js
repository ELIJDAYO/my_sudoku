export function isPeer(a, b) {
    if (!a || !b) return false;
    const squareA = ((Math.floor(a.x / 3)) * 3) + Math.floor(a.y / 3);
    const squareB = ((Math.floor(b.x / 3)) * 3) + Math.floor(b.y / 3);
    return a.x === b.x || a.y === b.y || squareA === squareB;
  }
  
export function isConflict(updatedBoard, x, y) {
    if (!updatedBoard || !updatedBoard.length || !updatedBoard[x] || !updatedBoard[x][y]) {
        // If updatedBoard or updatedBoard[x] or updatedBoard[x][y] is not defined, return false
        return false;
    }

    const cellValue = updatedBoard[x][y].value;

    // If cellValue is null, return false
    if (cellValue === null) {
        return false;
    }

    // Check for conflicts in the row
    const row = updatedBoard[x];
    const rowConflict = row.filter(cell => cell.value === cellValue).length > 1;

    // Check for conflicts in the column
    const column = updatedBoard.map(row => row[y]);
    const columnConflict = column.filter(cell => cell.value === cellValue).length > 1;

    // Check for conflicts in the square
    const squareIndex = Math.floor(x / 3) * 3 + Math.floor(y / 3);
    const squareStartX = Math.floor(squareIndex / 3) * 3;
    const squareStartY = (squareIndex % 3) * 3;
    const square = [];
    for (let i = squareStartX; i < squareStartX + 3; i++) {
        for (let j = squareStartY; j < squareStartY + 3; j++) {
            square.push(updatedBoard[i][j]);
        }
    }
    const squareConflict = square.filter(cell => cell.value === cellValue).length > 1;

    return rowConflict || columnConflict || squareConflict;
}

// Function to check if a Sudoku board puzzle is complete
export function isComplete(board) {
    // Iterate through each cell in the board
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = board[i][j];
        
        // Check if the cell is empty
        if (cell.value === null) {
          return false; // Puzzle is not complete if there's an empty cell
        }
        
        // Check if there's a conflict in the row, column, or square
        if (isConflict(board, i, j)) {
          return false; // Puzzle is not complete if there's a conflict
        }
      }
    }
    
    // If no empty cells and no conflicts, puzzle is complete
    return true;
  }