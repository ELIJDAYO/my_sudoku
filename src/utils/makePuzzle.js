const defaultCell = {
    value: null,
    notes: new Set([1, 2, 3]),
    prefilled: false,
  };
  
  function pickRandomSolution(solutionPatterns) {
    const randomIndex = Math.floor(Math.random() * solutionPatterns.length);
    console.log(solutionPatterns[randomIndex])
    return solutionPatterns[randomIndex];
  }
  
  const solutionPatterns = [
    // Solution pattern 1
    [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    [
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ],
  ];
  
  function pluckRandomCells(solution, finalCount) {
    // Make a shallow copy of the solution array
    const copiedSolution = solution.map(row => [...row]);
  
    const size = copiedSolution.length * copiedSolution[0].length; // Total number of cells
    const indices = new Set();
    
    // Generate random indices until the desired count is reached
    while (indices.size < finalCount) {
      const index = Math.floor(Math.random() * size);
      indices.add(index);
    }
    
    // Convert indices to row and column numbers
    const cols = copiedSolution[0].length;
    
    // Iterate through the copied solution grid and replace cells at selected indices with null
    for (const index of indices) {
      const row = Math.floor(index / cols);
      const col = index % cols;
      copiedSolution[row][col] = null;
    }
    
    return copiedSolution;
  }
  
export function pluck(finalCount) {
    const solution = pickRandomSolution(solutionPatterns);
    const plucked = pluckRandomCells(solution, finalCount);

  // Create a new array where each value is replaced with a Cell object
  const transformedPuzzle = plucked.map(row => row.map(value => {
    if (value === null) {
      // Return a new object with default values for an empty cell
      return { value: null, notes: new Set(), prefilled: false };
    } else {
      // Return a new object with the provided value and default notes and prefilled values
      return { value, notes: new Set([]), prefilled: true };
    }
  }));

  // Return the transformed puzzle as an array of arrays
  return {solution, transformedPuzzle};
}