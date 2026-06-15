import React, { useState } from 'react'

function Sudoku() {
  const [selected , setSelected] = useState(null);
  const [board , setBoard] = useState(
          Array(9).fill(null)
          .map(() => Array(9).fill(null))
        );
  const [puzzle , setPuzzle] = useState(Array(9).fill(null)
      .map(() => Array(9).fill(null))
    );

  const handleInput = (rIdx , cIdx , value) => {
      if(value == "" || (value >=1 && value <= 9)){
         setBoard((prev) => 
            prev.map((row, r) => 
              row.map((col , c) =>{
                if(r === rIdx && c === cIdx){
                  return value ? parseInt(value,10) : null;
                }
                return col;
              })
            )
        )
      }
  }

  return (
    <div className='min-h-screen container px-4 pt-20 pb-10 min-w-full flex flex-col items-center justify-center gap-6 bg-base-100 text-base-content select-none'>
      <span className="text-xl font-bold tracking-widest uppercase">Sudoku</span>
      <div className="w-full max-w-[396px] sm:max-w-[432px] aspect-square border-[6px] border-base-content bg-base-100 rounded-xl overflow-hidden grid grid-cols-9 grid-rows-9 shadow-xl">
        {board.map((row , rIdx) => {
          return row.map((col , cIdx) => {
            const isPrefilled = board[rIdx][cIdx] !== null;
            const borderRight = (cIdx === 2 || cIdx === 5) ? 'border-r-4 border-r-base-content' : 'border-r border-r-base-content/10';
            const borderBottom = (rIdx === 2 || rIdx === 5) ? 'border-b-4 border-b-base-content' : 'border-b border-b-base-content/10';
            const cleanRight = cIdx === 8 ? 'border-r-0' : borderRight;
            const cleanBottom = rIdx === 8 ? 'border-b-0' : borderBottom;
            
            const isAnyCellSelected = selected !== null;
            const isCurrentSelected = isAnyCellSelected && selected[0] === rIdx && selected[1] === cIdx;

            const isSameRow = isAnyCellSelected && rIdx === selected[0];
            const isSameCol = isAnyCellSelected && cIdx === selected[1];

            const isSameBox = isAnyCellSelected && 
                    Math.floor(rIdx/3) === Math.floor(selected[0]/3) &&
                    Math.floor(cIdx/3) === Math.floor(selected[1]/3);
            
            const highlightClass = isCurrentSelected 
              ? 'bg-primary/20' // Extra pop for the exact clicked cell
              : (isSameRow || isSameCol || isSameBox) 
                ? 'bg-primary/20' // Subtle highlight for the cross section
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
                    onClick={() => {setSelected([rIdx , cIdx])}}
                    onFocus={() => {setSelected([rIdx , cIdx])}}
                    onChange={(e) => {handleInput(rIdx , cIdx , e.target.value)}}
                    className="w-full h-full text-center font-mono font-black text-xl outline-none bg-transparent text-base-content focus:bg-primary focus:text-primary-content transition-colors duration-100"
                />
              </div>
            );
          })
        })}
      </div>

      {/* Fixed Responsive Buttons Layout (No Overflow) */}
      <div className='w-full max-w-[396px] sm:max-w-[432px] grid grid-cols-1 md:grid-cols-3 gap-3 px-1'>
        <button className="w-full btn btn-outline border-2 border-base-content/20 hover:border-base-content hover:bg-base-content hover:text-base-100 font-bold text-xs tracking-wider uppercase rounded-lg py-2 h-auto min-h-[40px]"
                onClick={() => {}}
        >
          Reset Board
        </button>
        <button className="w-full btn btn-outline border-2 border-base-content/20 hover:border-base-content hover:bg-base-content hover:text-base-100 font-bold text-xs tracking-wider uppercase rounded-lg py-2 h-auto min-h-[40px]">
          Reset Board
        </button>
        <button className="w-full btn btn-outline border-2 border-base-content/20 hover:border-base-content hover:bg-base-content hover:text-base-100 font-bold text-xs tracking-wider uppercase rounded-lg py-2 h-auto min-h-[40px]">
          Reset Board
        </button>
      </div>

    </div>
  )
}

export default Sudoku
