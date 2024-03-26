import React from 'react';
import Cell from './Cell';
import '../styles/tailwind.css'; // Import Tailwind CSS

const Board = ({ puzzle, onSelect }) => {
  return (
    <div className="grid grid-cols-9 gap-1">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell ? cell : null} // Check if cell exists before accessing value
            prefilled={cell ? cell.prefilled : false} // Check if cell exists before accessing prefilled
            onSelect={() => onSelect(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};
export default Board;