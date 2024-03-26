import React from 'react';
import './styles/tailwind.css'; // Import Tailwind CSS
import Game from "./utils/Game"

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Sudoku Puzzle</h1>
        <Game/> 
      </div>
    </div>
  );
};

export default App;