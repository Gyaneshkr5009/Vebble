import React, { useEffect, useRef, useState } from 'react'
import ReusableButton from '../../../../components/basic components/ReusableButton';
import { StepBack } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTimer from '../../../../components/useTimer';

const SchulteTable = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(5).fill(null).map(() => Array(5).fill(null)));
  const [boardSize , setBoardSize] = useState(5);
  const nextNumber = useRef(1);
  const [flashCell , setFlashCell] = useState(null);

  const { time, isActive, startTimer, stopTimer, resetTimer } = useTimer();

  const [, setUpdateTrigger] = useState(0);

  const fetchNewPuzzle = async (forcedSize) => {
    try {
      const cleanSize = (forcedSize && typeof forcedSize === 'number') ? forcedSize : boardSize;
      resetTimer();
      
      const response = await fetch('http://localhost:8080/api/games', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetNewGame {
              newSchulteTable(size: ${cleanSize}) {
                schulteBoard
              }
            }
          `
        })
      });

      const result = await response.json(); 

      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }
      
      if(!result.data || !result.data.newSchulteTable){
        throw new Error("Empty response or missing puzzle fields from server payload.");
      }
      const graphQlPayload = result.data;

      const apiGrid = graphQlPayload.newSchulteTable.schulteBoard;
      setBoard(apiGrid);
      setBoardSize(forcedSize);
      nextNumber.current = 1;
      setUpdateTrigger(prev => prev+1);

    } catch (error) {
      console.error("Failed to fetch puzzle:", error);
      alert("Whoops! Couldn't get a new puzzle. Try again.");
    }
  }

  const checkSelectedNumber = (rIdx , cIdx) => {
    const clickedNumber = board[rIdx][cIdx];

    if (nextNumber.current === 1 && !isActive) {
      startTimer();
    }
    
    if(clickedNumber === nextNumber.current){
      setFlashCell({ row: rIdx, col: cIdx, status: 'correct' });
      setTimeout(() => setFlashCell(null) , 300);
      const totalCells = boardSize * boardSize;
      if(nextNumber.current === totalCells){
        stopTimer();
        alert(`🎉 Awesome! You completed the ${boardSize}x${boardSize} table in ${time} seconds!`);
        resetTimer();
        fetchNewPuzzle(boardSize);
      } else {
        nextNumber.current = nextNumber.current + 1;
        setUpdateTrigger(prev => prev + 1);
      }
    }
    else{
      setFlashCell({ row: rIdx, col: cIdx, status: 'wrong' });
      setTimeout(() => setFlashCell(null) , 300);
    }
  }

  useEffect(() => {
    fetchNewPuzzle(5);
  },[]);

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
      <div className="w-full flex justify-center items-center overflow-y-auto">
        <div className="w-full max-w-5xl px-4 pt-12 pb-2 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-10 w-full"> 
            <div className="w-full max-w-[460px] lg:max-w-none lg:flex-1 bg-base-100/60 border border-base-content/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="border-b border-base-content/10 pb-4">
                  <h2 className="text-3xl font-black tracking-wider text-primary font-mono uppercase">
                    SCHULTE
                  </h2>
                  <p className="text-xxs text-base-content/70 tracking-wider mt-1 font-medium">
                    Find and tap numbers sequentially starting from 1!
                  </p>
                </div>
                <div className="bg-base-200/50 rounded-xl p-3 border border-base-content/5 font-mono text-xxs font-semibold uppercase tracking-widest text-base-content/80 space-y-2">
                  <p>📐 GRID SIZE: <span className="text-primary font-bold ml-1">{boardSize}x{boardSize}</span></p>
                  <p>🎯 NEXT TARGET: <span className="text-secondary font-bold ml-1">{nextNumber.current}</span></p>
                  <p>⏱️ ELAPSED TIME: <span className="font-bold text-primary ml-1">{time}<small>s</small></span></p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xxs font-bold uppercase tracking-wider text-base-content/60 block">Select Dimensions</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-bold font-mono">
                  {[3, 4, 5, 6, 7, 8].map((size) => (
                    <button
                      key={size}
                      onClick={() => fetchNewPuzzle(size)}
                      className={`py-2 px-3 rounded-lg border transition-all duration-150 ${
                        boardSize === size 
                          ? "bg-primary text-primary-content border-primary shadow-lg font-black scale-102" 
                          : "bg-base-200/60 border-base-content/10 text-base-content/90 hover:border-primary/40 hover:bg-base-200"
                      }`}
                    >
                      {size}x{size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 mt-auto">
                <label className="text-xxs font-bold uppercase tracking-wider text-slate-400 block">Board Controls</label>
                <div className="grid gap-2 font-mono text-xs font-bold">
                  <button 
                    onClick={() => {
                      nextNumber.current = 1;
                      fetchNewPuzzle(boardSize);
                    }} 
                    className="btn btn-sm btn-ghost bg-base-content text-base-300 hover:bg-base-content/90 normal-case rounded-lg"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full max-w-[460px] lg:max-w-none lg:flex-1 aspect-square">
              <div
                className="grid p-1.5 bg-base-100 border-4 border-primary rounded-2xl w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] shadow-primary/20 overflow-hidden gap-1.5"
                style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
              >
                {board.map((row, rIdx) => {
                  return row.map((col, cIdx) => {
                    const isFlashing = flashCell && flashCell.row === rIdx && flashCell.col === cIdx;
                    let flashClass = "bg-base-200 border-base-300 text-base-content hover:bg-secondary hover:text-secondary-content";
                    if (isFlashing) {
                      if (flashCell.status === 'correct') {
                        flashClass = "bg-success border-success text-success-content scale-95 shadow-inner transition-none";
                      } else if (flashCell.status === 'wrong') {
                        flashClass = "bg-error border-error text-error-content scale-105 shadow-lg shadow-error/30 animate-shake transition-none";
                      }
                    }
                    return (
                       <button
                        key={`${rIdx}-${cIdx}`} 
                        className={`w-full h-full flex items-center justify-center border-2 font-mono font-bold text-xl sm:text-2xl rounded-xl shadow-md active:scale-95 transition-all duration-100 cursor-pointer outline-none focus:outline-none ${flashClass}`}
                        onClick={() => checkSelectedNumber(rIdx, cIdx)}
                      >
                        {col !== null ? col : (
                          <span className="loading loading-spinner loading-sm text-primary/60"></span>
                        )}
                      </button>
                    )
                  })
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SchulteTable