import React, { Component, useState } from 'react';
import Cell from '../components/Cell';
import { isPeer, isConflict, isComplete } from './renderCell';
import NumberControl from '../components/NumberControl';
import { range } from './range';
import makeBoard from './makeBoard';
import { getClickHandler } from './getClickHandler';
import { pluck } from './makePuzzle';
import undoLogo from '../components/assets/undo.svg'; // Import the image
import eraseLogo from '../components/assets/erase.svg'; // Import the image
import redoLogo from '../components/assets/redo.svg'; // Import the image
import hintLogo from '../components/assets/hint.svg'; // Import the image
import Toast from '../components/Toast.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null,
      selected: null,
      selectedNumControl: null,
      showToastFail: false,
      showToastSuccess: false,
      completion:false,
      history: null,
      future: null,  
      completeBoard: null,

    };
    this.generateGame();
  }

  generateGame = (finalCount = 5) => {
    const {solution, transformedPuzzle:puzzle} = pluck(finalCount);
    const { puzzle: board } = makeBoard({ puzzle });
    if (this.mounted) {
      this.setState({ 
        board,
        completeBoard: solution,
        history: [],
        future: [],
      });
    } else {
      this.state = { 
        board,
        completeBoard: solution,
        history: [],
        future: [],
      };
    }
  };

  updateBoard = (newBoard) => {
    this.setState({ board: newBoard });
  };

  getNumberValueCount(number) {
    const { board } = this.state;
    // Use reduce to flatten the puzzle array and count occurrences of the number
    const count = board.flat().reduce((acc, cell) => {
      return acc + (cell?.value === number ? 1 : 0);
    }, 0);
    return count;
  }

  selectCell = (x, y) => {
    const { board } = this.state;
    const updatedBoard = JSON.parse(JSON.stringify(board));
    updatedBoard.selected = { x, y };
    this.setState({ selected: { x, y }, board: updatedBoard });
  };

  getSelectedCell = () => {
    const { board } = this.state;
    const selected = board.selected;
    if (selected && board.puzzle) {
      const { x, y } = selected;
      return board.puzzle[x][y];
    }
    return null; // or any default value you prefer
  };

  renderCell = (cell, x, y) => {
    const { board } = this.state;
    const selected = this.getSelectedCell();
    const { value, prefilled, notes } = cell;
    const conflict = isConflict(board, x, y);
    const peer = isPeer({ x, y }, board.selected);
    const sameValue = !!(
      selected &&
      selected.value &&
      value === selected.value
    );
    const isSelected = cell === selected;

    // Ensure prefilled is defined or set it to a default value
    const prefilledValue = prefilled !== undefined ? prefilled : false;
    return (
      <Cell
        prefilled={prefilledValue}
        // notes={notes}
        sameValue={sameValue}
        isSelected={isSelected}
        isPeer={peer}
        value={value}
        onClick={() => {
          this.selectCell(x, y);
        }}
        key={y}
        x={x}
        y={y}
        conflict={conflict}
      />
    );
  };

  fillNumber = (number) => {
    const { selected, board, history, future } = this.state;
  
    if (selected) {
      const { x, y } = selected;
      if (board[x][y].prefilled) {
        // If the selected cell is prefilled, do not update
        return;
      }
  
      // Create a shallow copy of the board
      const updatedBoard = board.map(row => [...row]);
      updatedBoard[x][y].value = number;
  
      if (isConflict(updatedBoard, x, y)) {
        // If there's a conflict, display the toast
        this.setState({ showToastFail: true }, () => {
          setTimeout(() => {
            this.setState({ showToastFail: false });
          }, 3000);
        });
        return;
      } else {
        // Update the history and future
        this.setState({
          board: updatedBoard,
          history: [...history, board], // Add current state to history
          future: [], // Clear future stack when a new action is performed
        });
      }
  
      // Check if the puzzle is complete
      if (isComplete(updatedBoard)) {
        // Display the success toast
        this.setState({ showToastSuccess: true }, () => {
          setTimeout(() => {
            this.setState({ showToastSuccess: false });
          }, 3000);
        });
      }
    }
  };

  redo = () => {
    const { history, future } = this.state;
    if (future.length > 0) {
      const nextState = future.pop(); // Get the next state from the future stack
      this.setState({
        board: nextState,
        history: [...history, nextState], // Add the current state to the history stack
      });
    }
  };
  
  undo = () => {
    const { history, future } = this.state;
    if (history.length > 1) {
      const previousState = history[history.length - 2]; // Get the previous state from the history stack
      const newHistory = history.slice(0, -1); // Remove the last state from the history stack
      this.setState({
        board: previousState,
        history: newHistory, // Update the history stack
        future: [...future, history[history.length - 1]], // Add the current state to the future stack
      });
    }
  };

  erase = () => {
    const { selected, board } = this.state;
    if (selected) {
      const { x, y } = selected;
      const cell = board[x][y];
  
      // Check if the cell is prefilled
      if (cell.prefilled) {
        // If the cell is prefilled, do not erase its value
        return;
      }
  
      const updatedBoard = [...board]; // Shallow copy of the board
      updatedBoard[x][y].value = null; // Erase the value by setting it to null
      this.setState({ board: updatedBoard });
    }
  };

  hint = () => {
    const { board, completeBoard } = this.state;
  
    // Ensure that completeBoard is not null
    if (!completeBoard) {
      return;
    }
  
    // Find empty cells
    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!board[i][j].value) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
  
    // If there are no empty cells, return
    if (emptyCells.length === 0) {
      return;
    }
  
    // Select a random empty cell
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { x, y } = emptyCells[randomIndex];
  
    // Fill the cell with the corresponding value from the complete board
    const value = completeBoard[x][y];
    const updatedBoard = [...board]; // Shallow copy of the board
    updatedBoard[x][y].value = value;
    console.log(x, y, value)

    // Update the state with the new board
    this.setState({ board: updatedBoard });
  };

  handleNumberClick = (number) => {
    const selectedCell = this.getSelectedCell();
    const prefilled = selectedCell && selectedCell.get('prefilled');
    if (!prefilled) {
      this.fillNumber(number);
    } else {
      this.addNumberAsNote(number); //not implemented
    }
    return null;
  };

  renderNumberControl() {
    const numbersAbove = range(1, 7);
    const numbersBelow = range(7, 10);

    return (
      <div>
        <div className="control justify-center mt-3 flex flex-wrap">
          {/* Render NumberControl components for numbers 1-5 */}
          {numbersAbove.map((number) => (
            <NumberControl
              key={number}
              number={number}
              onClick={() => {
                this.handleNumberClick(number);
              }}
              completionPercentage={
                (this.getNumberValueCount(number) / 9) * 100
              }
            />
          ))}
        </div>
        <div className="control justify-center mt-3 flex flex-wrap">
          {/* Render NumberControl components for numbers 6-9 */}
          {numbersBelow.map((number) => (
            <NumberControl
              key={number}
              number={number}
              onClick={() => {
                this.handleNumberClick(number);
              }}
              completionPercentage={
                (this.getNumberValueCount(number) / 9) * 100
              }
            />
          ))}
        </div>
      </div>
    );
  }

  renderPuzzle() {
    const { board } = this.state;
    // console.log(board);
    if (!board) return null; // Handle case where puzzle is undefined
    return (
      <div className="puzzle">
        {board.map((row, i) => (
          <div
            key={i}
            className={`flex ${
              i === 2 || i === 5 || i === 8 ? 'border-b-2' : ''
            }`}
          >
            {row.map((cell, j) => (
              <div
                key={j}
                className={`flex items-center justify-center w-10 h-10 border border-gray-400 ${
                  j === 2 || j === 5 || j === 8 ? 'border-r-2' : ''
                }`}
              >
                {this.renderCell(cell, i, j)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { showToastFail } = this.state;
    const { showToastSuccess } = this.state;

    return (
      <div className="flex justify-center">
        {/* Center frame containing Sudoku puzzle and number controls */}
        <div className="mr-8">
          <div>{this.renderPuzzle()}</div>
          <div>{this.renderNumberControl()}</div>
          {showToastFail && (
            <Toast
              message="Conflict detected! Please check your inputs."
              duration={3000}
            />
          )}
          {showToastSuccess && (
          <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white px-4 py-2 rounded">
            Puzzle completed successfully!
          </div>
        )}
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-5 mr-2" onClick={this.undo}>
            <img src={undoLogo} alt="Undo" className="w-10 h-10 mb-2" />
            <div className="text-black text-center">Undo</div>
          </div>
          <div className="mb-5 mr-2" onClick={this.redo}>
            <img src={redoLogo} alt="Redo" className="w-10 h-10 mb-2" />
            <div className="text-black text-center">Redo</div>
          </div>
          <div className="mb-5 mr-2" onClick={this.erase}>
            <img src={eraseLogo} alt="Erase" className="w-10 h-10 mb-2" />
            <div className="text-black text-center">Erase</div>
          </div>
          <div className="mb-5 mr-2" onClick={this.hint}>
            <img src={hintLogo} alt="Hint" className="w-10 h-10 mb-2" />
            <div className="text-black text-center">Hint</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
