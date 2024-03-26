// Import the necessary libraries
import { fromJS } from 'immutable';

// Define the makeBoard function
function makeBoard(puzzle) {
  // Create an initial count object to keep track of conflicts per number value
  const rows = Array.from(Array(9).keys()).map(() => makeCountObject());
  const columns = Array.from(Array(9).keys()).map(() => makeCountObject());
  const squares = Array.from(Array(9).keys()).map(() => makeCountObject());
  const result = puzzle.puzzle.map((row, i) =>
    row.map((cell, j) => {
      if (cell.value) {
        rows[i][cell.value] += 1;
        columns[j][cell.value] += 1;
        squares[Math.floor(i / 3) * 3 + Math.floor(j / 3)][cell.value] += 1;
      }
      return {
        value: cell.value || null,
        prefilled: cell.prefilled || false,
        notes: cell.notes
      };
    })
  );
  // Return the result as an Immutable.js object
  return ({ puzzle: result, selected: false, choices: { rows, columns, squares } });
}

// Define the makeCountObject function
function makeCountObject() {
  const countObj = [];
  for (let i = 0; i < 10; i += 1) countObj.push(0);
  return countObj;
}

// Export the makeBoard function
export default makeBoard;
