import React, { useEffect, useState } from 'react';
import ReusableButton from '../../../../components/basic components/ReusableButton';
import { StepBack } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { axiosSpringInstance } from '../../../../lib/axios';

const getGridConfig = (size) => {
  switch (size) {
    case 4:  return { boxRows: 2, boxCols: 2, textClass: 'text-2xl font-bold' };
    case 6:  return { boxRows: 2, boxCols: 3, textClass: 'text-xl font-semibold' };
    case 9:  return { boxRows: 3, boxCols: 3, textClass: 'text-xl font-medium' };
    case 10: return { boxRows: 2, boxCols: 5, textClass: 'text-lg font-medium' };
    case 12: return { boxRows: 3, boxCols: 4, textClass: 'text-base font-medium' };
    case 16: return { boxRows: 4, boxCols: 4, textClass: 'text-xs font-normal' };
    default: return { boxRows: 3, boxCols: 3, textClass: 'text-xl font-medium' };
  }
};

function Sudoku() {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const [boardSize, setBoardSize] = useState(9);
  const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [puzzle, setPuzzle] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [gamedifficulty, setGameDifficulty] = useState("Loading...");
  const [targetDifficulty, setTargetDifficulty] = useState(null);
  const [checkButtonResponse , setCheckButtonResponse] = useState(2);

  const config = getGridConfig(boardSize);

  const fetchNewPuzzle = async (forcedSize) => {
    try {
      setGameDifficulty("Loading...");
      const cleanSize = (forcedSize && typeof forcedSize === 'number') ? forcedSize : boardSize;
      const difficultyArg = targetDifficulty ? `"${targetDifficulty}"` : 'null';
      
      const response = await axiosSpringInstance.post('/games', {
          query: `
            query GetNewGame {
              newSudokuBoard(limit: 1, difficulty: ${difficultyArg}, size: ${cleanSize}) {
                grids {
                  value
                  solution
                  difficulty
                }
              }
            }
          `
        });
      const result = response.data;

      if(result.errors && result.errors.length > 0){
        throw new Error(result.errors[0].message);
      }

      if (!result.data || !result.data.newSudokuBoard || !result.data.newSudokuBoard.grids || result.data.newSudokuBoard.grids.length === 0) {
        throw new Error("Empty response or missing puzzle fields from server payload.");
      }

      const graphQlPayload = result.data;
      
      const apiGrid = graphQlPayload.newSudokuBoard.grids[0].value;
      const apiSolution = graphQlPayload.newSudokuBoard.grids[0].solution;
      const apiDifficulty = graphQlPayload.newSudokuBoard.grids[0].difficulty;

      const formattedPuzzle = apiGrid.map(row => 
        row.map(cell => cell === ' ' ? null : cell) // cell having value as ' ' changing to null for new input
      );

      setBoardSize(forcedSize);
      setPuzzle(formattedPuzzle);
      setBoard(formattedPuzzle.map(row => [...row]));
      setSolutions([apiSolution]); 
      setGameDifficulty(apiDifficulty);
      setSelected(null);

    } catch (error) {
      console.error("Failed to fetch puzzle:", error);
      alert("Whoops! Couldn't get a new puzzle. Try again.");
      setGameDifficulty("Error");
    }
  };

  useEffect(() => {
    fetchNewPuzzle(9);
  }, []);


  const handleInput = (rIdx, cIdx, value) => {
    const cleanValue = value.trim() === "" ? null : value.toUpperCase();

    setBoard((prev) =>
      prev.map((row, r) =>
        row.map((col, c) => {
          if (r === rIdx && c === cIdx) {
            return cleanValue;
          }
          return col;
        })
      )
    );
  };


  const handleReset = () => {
    setBoard(puzzle.map((row) => [...row]));
    setSelected(null);
  };

  const handleShowSolution = () => {
    if (solutions.length > 0) {
      setBoard(solutions[0].map((row) => [...row]));
    }
  };

  const handleCheck = () => {
    if (solutions.length === 0) return;
    
    const isCorrect = board.every((row, rIdx) => 
      row.every((col, cIdx) => col !== null && col.toString() === solutions[0][rIdx][cIdx].toString())
    );

    const isFull = board.every(row => row.every(col => col !== null));

    if (isCorrect) {
      setCheckButtonResponse(1);
    } else if (!isFull) {
      setCheckButtonResponse(2);
    } else {
      setCheckButtonResponse(3);
    }
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    },3000);
  };

  const handleSizeChange = (newSize) => {
    fetchNewPuzzle(newSize);
  };

  return (
    <div className="min-h-screen container px-4 pt-20 pb-2 min-w-full">
      <div className="pt-2 flex justify-start mb-4">
        <ReusableButton
          onClick={() => navigate('/games')}
          icon={StepBack}
        >
          Games
        </ReusableButton>
      </div>
      <div className="w-full flex justify-center items-center overflow-y-auto mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-6 sm:gap-12 w-full max-w-[340px] sm:max-w-none sm:w-auto pt-12">
          <div className="w-full sm:h-[420px] md:h-[460px] flex flex-col justify-between gap-4 bg-base-200/40 p-4 rounded-xl border border-base-content/5 shadow-md shrink-0">
            <div className="flex flex-col items-center sm:items-start bg-base-100 p-3 rounded-lg border border-base-content/5 shadow-sm">
              <span className="text-3xl font-black tracking-widest uppercase text-primary leading-none">Sudoku</span>
              <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1 text-[11px] font-bold opacity-75 uppercase tracking-wider mt-2.5">
                <div className="flex items-center gap-1.5">
                  <span>📐 Grid Size:</span>
                  <span className="text-primary font-black">{boardSize}x{boardSize}</span>
                </div>
                <span className="sm:hidden text-base-content/30">•</span>
                <div className="flex items-center gap-1.5">
                  <span>🎯 Live Diff:</span>
                  <span className="text-primary font-black">{gamedifficulty}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 bg-base-100 p-3 rounded-lg border border-base-content/5 shadow-sm">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-wider opacity-60 px-0.5">Select Dimensions</label>
                <div className="grid grid-cols-3 sm:grid-cols-2 gap-1">
                  {[4, 6, 9, 10, 12, 16].map((sizeOption) => (
                    <button
                      key={sizeOption}
                      onClick={() => handleSizeChange(sizeOption)}
                      className={`btn btn-xs font-black tracking-wide rounded-md h-7 min-h-[28px] p-0 transition-all ${
                        boardSize === sizeOption 
                          ? 'btn-primary shadow-sm' 
                          : 'btn-outline border-base-content/10 text-base-content/80 hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {sizeOption}x{sizeOption}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-wider opacity-60 px-0.5">Pool Difficulty</label>
                <select 
                  className="select select-xs w-full font-bold tracking-wider uppercase text-[11px] h-7 min-h-[28px] rounded-md border border-base-content/10 bg-base-100 focus:border-primary focus:outline-none shadow-sm cursor-pointer"
                  value={targetDifficulty || "RANDOM"}
                  onChange={(e) => setTargetDifficulty(e.target.value === "RANDOM" ? null : e.target.value)}
                >
                  <option value="RANDOM">🎲 Random Pool</option>
                  <option value="EASY">🟢 Easy Mode</option>
                  <option value="MEDIUM">🟡 Medium Mode</option>
                  <option value="HARD">🔴 Hard Mode</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-wider opacity-60 px-0.5">Board Controls</label>
                <div className="grid grid-cols-4 sm:grid-cols-2 gap-1">
                  <button className="btn btn-xs btn-outline border border-base-content/20 font-black text-[10px] uppercase rounded-md h-7 min-h-[28px] p-0 hover:bg-base-content hover:text-base-100" onClick={handleReset}>Reset</button>
                  <button className="btn btn-xs btn-outline border border-base-content/20 font-black text-[10px] uppercase rounded-md h-7 min-h-[28px] p-0 hover:btn-success hover:text-success-content" onClick={handleCheck}>Check</button>
                  <button className="btn btn-xs btn-outline border border-base-content/20 font-black text-[10px] uppercase rounded-md h-7 min-h-[28px] p-0 hover:bg-base-content hover:text-base-100" onClick={handleShowSolution}>Solve</button>
                  <button className="btn btn-xs btn-outline border border-info/50 text-info font-black text-[10px] uppercase rounded-md h-7 min-h-[28px] p-0 hover:bg-info hover:text-base-100" onClick={() => fetchNewPuzzle(boardSize)}>New</button>
                </div>
              </div>

            </div>

          </div>
          {/* Sudoku Matrix Grid */}
          <div 
            className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] aspect-square border-[5px] border-base-content bg-base-100 rounded-xl overflow-hidden shadow-2xl grid shrink-0"
            style={{
              gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`
            }}
          >
            {board.map((row, rIdx) => {
              return row.map((col, cIdx) => {
                const isPrefilled = puzzle[rIdx][cIdx] !== null;
                
                const hasRightBorder = (cIdx + 1) % config.boxCols === 0 && (cIdx + 1) !== boardSize;
                const hasBottomBorder = (rIdx + 1) % config.boxRows === 0 && (rIdx + 1) !== boardSize;

                const borderRight = hasRightBorder ? 'border-r-[3.5px] border-r-base-content' : 'border-r border-r-base-content/10';
                const borderBottom = hasBottomBorder ? 'border-b-[3.5px] border-b-base-content' : 'border-b border-b-base-content/10';
                
                const cleanRight = cIdx === boardSize - 1 ? 'border-r-0' : borderRight;
                const cleanBottom = rIdx === boardSize - 1 ? 'border-b-0' : borderBottom;
                
                const isAnyCellSelected = selected !== null;
                const isCurrentSelected = isAnyCellSelected && selected[0] === rIdx && selected[1] === cIdx;

                const isSameRow = isAnyCellSelected && rIdx === selected[0];
                const isSameCol = isAnyCellSelected && cIdx === selected[1];

                const isSameBox = isAnyCellSelected && 
                        Math.floor(rIdx / config.boxRows) === Math.floor(selected[0] / config.boxRows) &&
                        Math.floor(cIdx / config.boxCols) === Math.floor(selected[1] / config.boxCols);
                
                const highlightClass = isCurrentSelected 
                  ? 'bg-primary/20' 
                  : (isSameRow || isSameCol || isSameBox) 
                    ? 'bg-primary/5' 
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
                      onClick={() => setSelected([rIdx, cIdx])}
                      onFocus={() => setSelected([rIdx, cIdx])}
                      onChange={(e) => handleInput(rIdx, cIdx, e.target.value)}
                      className={`w-full h-full text-center font-mono outline-none bg-transparent focus:bg-primary/10 transition-colors duration-100 ${config.textClass} ${
                        isPrefilled ? 'font-black text-base-content' : 'font-semibold text-primary'
                      }`}
                    />
                  </div>
                );
              });
            })}
          </div>
        </div>
        <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none'>
          {isVisible && checkButtonResponse && (
            <div className={`w-[90vw] sm:w-auto max-w-[340px] p-4 rounded-xl text-center shadow-2xl border backdrop-blur-md transition-all duration-300 transform animate-fade-in ${
              checkButtonResponse === 1 ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400 shadow-emerald-950/50' :
              checkButtonResponse === 2 ? 'bg-cyan-950/80 border-cyan-500/30 text-cyan-400 shadow-cyan-950/50' : 
              'bg-rose-950/80 border-rose-500/30 text-rose-400 shadow-rose-950/50'
            }`}>
              <h4 className="font-bold text-sm uppercase tracking-widest font-mono">
                {checkButtonResponse === 1 && "🎉 Success!"}
                {checkButtonResponse === 2 && "⚡ Progress Status"}
                {checkButtonResponse === 3 && "❌ Conflict Detected"}
              </h4>
              <p className="text-xs font-medium mt-1 text-slate-300">
                {checkButtonResponse === 1 && "Amazing job! You solved the puzzle perfectly!"}
                {checkButtonResponse === 2 && "Keep going! There are still blank spaces left inside the matrix!"}
                {checkButtonResponse === 3 && "The board configuration contains active overlapping mistakes."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sudoku;