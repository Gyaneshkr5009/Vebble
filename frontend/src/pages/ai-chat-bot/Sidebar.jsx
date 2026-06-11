import { useState } from 'react'
import {CirclePlus , Menu , Search} from "lucide-react"

function Sidebar() {
    const [extend , setExtend] = useState(false);
  return (
    <div className={`h-full border-r border-base-content/10 bg-base-100 transition-all duration-300 ease-in-out flex flex-col p-3 ${extend ? 'w-64' : 'w-[68px]'}`}>
        
        <div className="h-14 flex items-center mb-4">
            <button 
                onClick={() => setExtend(prev => !prev)}
                className="p-2 rounded-lg hover:bg-base-200 text-base-content/70 hover:text-base-content transition-colors"
            >
                <Menu className="h-5 w-5" />
            </button>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
            
            <button className="w-full flex items-center gap-3 rounded-lg bg-primary text-primary-content p-2.5 text-sm font-medium hover:bg-primary/90 transition-colors overflow-hidden whitespace-nowrap">
                <CirclePlus className="h-5 w-5 shrink-0" />
                {extend && <span className="animate-fade-in">New chat</span>}
            </button>

            <button className="w-full flex items-center gap-3 rounded-lg text-base-content/70 p-2.5 text-sm font-medium hover:bg-primary hover:text-primary-content transition-colors overflow-hidden whitespace-nowrap">
                <Search className="h-5 w-5 shrink-0" />
                {extend && <span className="animate-fade-in">Search chats</span>}
            </button>
            
        </div>
    </div>
  )
}

export default Sidebar