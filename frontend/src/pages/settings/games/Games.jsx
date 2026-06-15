import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableButton from '../../../components/basic components/ReusableButton'

function games() {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen container px-4 pt-20 pb-2 min-w-full'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-xl border border-base-300 bg-base-200/40 hover:bg-base-200/60 transition-all duration-300 flex flex-col justify-between gap-5 group relative overflow-hidden hover:border-accent/30">
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-video rounded-lg bg-base-300/10 relative overflow-hidden flex items-center justify-center border border-base-300/40 group-hover:border-accent/20 transition-colors duration-300 [background-image:linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:14%_33.3%]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--p),0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative font-mono font-black tracking-tight text-4xl select-none flex gap-1 opacity-25 group-hover:opacity-80 transition-all duration-300 scale-95 group-hover:scale-100">
                <span className="text-base-content/80 group-hover:text-primary transition-colors duration-300">S</span>
                <span className="text-base-content/60 group-hover:text-accent transition-colors duration-300">D</span>
                <span className="text-base-content/80 group-hover:text-secondary transition-colors duration-300">K</span>
              </div>
            </div>
            
            <div className="min-w-0">
              <h4 className="font-semibold text-sm tracking-wide text-base-content/90 group-hover:text-accent transition-colors duration-200 truncate">
                Sudoku Puzzle
              </h4>
              <p className="text-xs text-base-content/50 mt-1 line-clamp-2 leading-relaxed">
                Train your brain with classic number placement grids.
              </p>
            </div>
          </div>
          
          <ReusableButton
            onClick={() => navigate('/games/sudoku')}
            className="w-full btn-accent btn-sm rounded-lg transition-all duration-300 active:scale-95 group-hover:shadow-md group-hover:shadow-accent/10"
          >
            Play Now
          </ReusableButton>

        </div>
      </div>
    </div>
  )
}

export default games
