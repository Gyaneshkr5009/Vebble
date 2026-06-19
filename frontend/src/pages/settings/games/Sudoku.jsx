import React, { useEffect, useState } from 'react';

function Sudoku() {
  const [solutions, setSolutions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [puzzle, setPuzzle] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [difficulty, setDifficulty] = useState("Loading...");

  const fetchNewPuzzle = async () => {
    try {
      setDifficulty("Loading...");
      
      const response = await fetch('https://sudoku-api.vercel.app/api/dosuku');
      const data = await response.json();
      
      const apiGrid = data.newboard.grids[0].value;
      const apiSolution = data.newboard.grids[0].solution;
      const apiDifficulty = data.newboard.grids[0].difficulty;

      const formattedPuzzle = apiGrid.map(row => 
        row.map(cell => cell === 0 ? null : cell)
      );

      setPuzzle(formattedPuzzle);
      setBoard(formattedPuzzle.map(row => [...row]));
      setSolutions([apiSolution]); 
      setDifficulty(apiDifficulty);
      setSelected(null);

    } catch (error) {
      console.error("Failed to fetch puzzle:", error);
      alert("Whoops! Couldn't get a new puzzle. Try again.");
      setDifficulty("Error");
    }
  };

  useEffect(() => {
    fetchNewPuzzle();
  }, []);

  const handleInput = (rIdx, cIdx, value) => {
    if (value === "" || (value >= 1 && value <= 9)) {
      setBoard((prev) =>
        prev.map((row, r) =>
          row.map((col, c) => {
            if (r === rIdx && c === cIdx) {
              return value ? parseInt(value, 10) : null;
            }
            return col;
          })
        )
      );
    }
  };

  const handleReset = () => {
    setBoard(puzzle.map((row) => [...row]));
    setSelected(null);
  };

  const handleShowSolution = () => {
    if (solutions.length > 0) {
      setBoard(solutions[Math.floor(Math.random()*solutions.length)].map((row) => [...row]));
    }
  };

  const handleCheck = () => {
    if (solutions.length === 0) return;
    
    const isCorrect = board.every((row, rIdx) => 
      row.every((col, cIdx) => col !== null && col === solutions[0][rIdx][cIdx])
    );

    const isFull = board.every(row => row.every(col => col !== null));

    if (isCorrect) {
      alert("Congratulations! You solved the puzzle!");
    } else if (!isFull) {
      alert("Keep going! There are still empty spaces, but check for mistakes!");
    } else {
      alert("The board is full, but there are mistakes. Try resetting or fixing them.");
    }
  };

  return (
    <div className='min-h-screen container px-4 pt-20 pb-10 min-w-full flex flex-col items-center justify-center gap-6 bg-base-100 text-base-content select-none'>
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold tracking-widest uppercase">Sudoku</span>
        <span className="text-sm font-medium opacity-70 tracking-widest uppercase mt-1">
          {difficulty}
        </span>
      </div>

      <div className="w-full max-w-[396px] sm:max-w-[432px] aspect-square border-[6px] border-base-content bg-base-100 rounded-xl overflow-hidden grid grid-cols-9 grid-rows-9 shadow-xl">
        {board.map((row, rIdx) => {
          return row.map((col, cIdx) => {
            const isPrefilled = puzzle[rIdx][cIdx] !== null;
            
            const borderRight = (cIdx === 2 || cIdx === 5) ? 'border-r-4 border-r-base-content' : 'border-r border-r-base-content/10';
            const borderBottom = (rIdx === 2 || rIdx === 5) ? 'border-b-4 border-b-base-content' : 'border-b border-b-base-content/10';
            const cleanRight = cIdx === 8 ? 'border-r-0' : borderRight;
            const cleanBottom = rIdx === 8 ? 'border-b-0' : borderBottom;
            
            const isAnyCellSelected = selected !== null;
            const isCurrentSelected = isAnyCellSelected && selected[0] === rIdx && selected[1] === cIdx;

            const isSameRow = isAnyCellSelected && rIdx === selected[0];
            const isSameCol = isAnyCellSelected && cIdx === selected[1];

            const isSameBox = isAnyCellSelected && 
                    Math.floor(rIdx / 3) === Math.floor(selected[0] / 3) &&
                    Math.floor(cIdx / 3) === Math.floor(selected[1] / 3);
            
            const highlightClass = isCurrentSelected 
              ? 'bg-primary/20' 
              : (isSameRow || isSameCol || isSameBox) 
                ? 'bg-primary/20' 
                : 'bg-transparent';

            return (
              <div 
                key={`${rIdx}-${cIdx}`} 
                className={`w-full h-full flex items-center justify-center box-border ${cleanRight} ${cleanBottom} ${highlightClass}`}
              >
                <input 
                    type='text' 
                    maxLength={1} 
                    value={col === null ? '' : col}
                    readOnly={isPrefilled}
                    onClick={() => {setSelected([rIdx, cIdx])}}
                    onFocus={() => {setSelected([rIdx, cIdx])}}
                    onChange={(e) => {handleInput(rIdx, cIdx, e.target.value)}}
                    className={`w-full h-full text-center font-mono text-xl outline-none bg-transparent focus:bg-primary focus:text-primary-content transition-colors duration-100 ${
                      isPrefilled ? 'font-black text-base-content' : 'font-medium text-info'
                    }`}
                />
              </div>
            );
          });
        })}
      </div>

      <div className='w-full max-w-[396px] sm:max-w-[432px] grid grid-cols-2 md:grid-cols-4 gap-3 px-1'>
        <button 
          className="w-full btn btn-outline border-2 border-base-content/20 hover:border-base-content hover:bg-base-content hover:text-base-100 font-bold text-xs tracking-wider uppercase rounded-lg py-2 h-auto min-h-[40px]"
          onClick={handleReset}
        >
          Reset
        </button>
        <button 
          className="w-full btn btn-outline border-2 border-base-content/20 hover:border-base-content hover:bg-base-content hover:text-base-100 font-bold text-xs tracking-wider uppercase rounded-lg py-2 h-auto min-h-[40px]"
          onClick={handleCheck}
        >
          Check
        </button>
        <button 
          className="w-full btn btn-outline border-2 border-base-content/20 hover:border-base-content hover:bg-base-content hover:text-base-100 font-bold text-xs tracking-wider uppercase rounded-lg py-2 h-auto min-h-[40px]"
          onClick={handleShowSolution}
        >
          Solution
        </button>
        <button 
          className="w-full btn btn-outline border-2 border-info/50 text-info hover:border-info hover:bg-info hover:text-base-100 font-bold text-xs tracking-wider uppercase rounded-lg py-2 h-auto min-h-[40px]"
          onClick={fetchNewPuzzle}
        >
          New Game
        </button>
      </div>

    </div>
  );
}

export default Sudoku;