import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableButton from '../../../components/basic components/ReusableButton'

function games() {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen container px-4 pt-20 pb-2 min-w-full'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {/* Sudoku  */}
        <div className="group relative flex flex-col justify-between p-5 rounded-xl border border-base-300 bg-base-200/30 hover:bg-base-200/60 hover:border-accent/40 transition-all duration-200 overflow-hidden">
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-video rounded-lg bg-base-300/20 flex items-center justify-center border border-base-300/30 group-hover:border-accent/20 transition-colors duration-200 select-none">
              <div className="font-mono font-black tracking-tight text-3xl opacity-20 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100 flex gap-0.5">
                <span className="text-base-content group-hover:text-primary">Su</span>
                <span className="text-base-content group-hover:text-accent">do</span>
                <span className="text-base-content group-hover:text-secondary">ku</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="px-2 py-0.5 font-bold uppercase tracking-wider rounded bg-accent/10 text-accent">
                  Logic & Strategy
                </span>
                <span className="text-base-content/40 font-medium">
                  Grid Puzzle
                </span>
              </div>
              <h4 className="font-semibold text-sm tracking-wide text-base-content/90 group-hover:text-accent transition-colors duration-200 truncate">
                Sudoku Puzzle
              </h4>
              <p className="text-xs text-base-content/50 line-clamp-2 leading-relaxed">
                Train your brain with classic number placement grids.
              </p>
            </div>
          </div>
          
          <ReusableButton
            onClick={() => navigate('/games/sudoku')}
            className="w-full btn-accent btn-sm rounded-lg mt-5 active:scale-95 transition-transform duration-200"
          >
            Play Now
          </ReusableButton>
        </div>

        {/* Schulte Table */}
      <div className="group relative flex flex-col justify-between p-3 sm:p-5 rounded-xl border border-base-300 bg-base-200/30 hover:bg-base-200/60 hover:border-accent/40 transition-all duration-200 overflow-hidden">

        <div className="flex flex-col gap-3">
          <div className="w-full aspect-video rounded-lg bg-base-300/20 flex items-center justify-center border border-base-300/30 group-hover:border-accent/20 transition-colors duration-200 select-none">
            <div className="font-mono font-black tracking-tight text-xl sm:text-3xl opacity-20 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100 flex gap-0.5">
              <span className="text-base-content group-hover:text-primary">Sch</span>
              <span className="text-base-content group-hover:text-accent">ul</span>
              <span className="text-base-content group-hover:text-secondary">te</span>
            </div>
          </div>
          
          <div className="space-y-1 sm:space-y-2">
            <div className="flex flex-wrap items-center gap-1.5 text-[9px] sm:text-[10px]">
              <span className="px-1.5 py-0.5 font-bold uppercase tracking-wider rounded bg-primary/10 text-primary whitespace-nowrap">
                Focus & Speed
              </span>
              <span className="text-base-content/40 font-medium whitespace-nowrap">
                Trainer
              </span>
            </div>

            <h4 className="font-semibold text-xs sm:text-sm tracking-wide text-base-content/90 group-hover:text-accent transition-colors duration-200 truncate">
              Schulte Table
            </h4>

            <p className="text-[11px] sm:text-xs text-base-content/50 line-clamp-2 leading-relaxed">
              Find numbers in ascending order to expand your peripheral vision.
            </p>
          </div>
        </div>
        
        <ReusableButton
          onClick={() => navigate('/games/schulte-table')}
          className="w-full btn-accent btn-xs sm:btn-sm rounded-md sm:rounded-lg mt-3 sm:mt-5 active:scale-95 transition-transform duration-200 text-[10px] sm:text-xs"
        >
          Play Now
        </ReusableButton>
      </div>
      </div>
    </div>
  )
}

export default games
