import React, { useContext, useRef} from 'react'
import { vebbleAiBackendContext } from '../../constants/VebbleAiContext';
import { MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

function ChatSession() {
   const {sendPromptToSpring , aiData , input , setInput , showResult,isLoading} = useContext(vebbleAiBackendContext);

   const handleSend = async(e) => {
    e.preventDefault();
    if(!input.trim() || isLoading) return;
    setInput("");
    try {
      await sendPromptToSpring(input);
    } catch (error) {
      console.error("Sending failed :" , error);
    }
   }
  
  return (
    <div className="flex flex-col flex-1 h-full w-full bg-base-100 relative overflow-hidden">
      
      <div className="flex items-center justify-between px-6 py-3 border-b border-base-300 bg-base-100/80 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <span className="text-md font-semibold text-base-content tracking-tight">
            Vebble AI
          </span>
          <span className="text-[10px] font-bold tracking-wide bg-base-200 text-base-content/70 px-2 py-0.5 rounded-full border border-base-300">
            v1.0
          </span>
        </div>
      </div>
      <div className={`flex-1 overflow-y-auto px-4 md:px-0 py-12 flex ${!showResult ? 'items-center justify-center' : 'items-start'}`}>
        <div className={`max-w-2xl md:max-w-3xl w-full mx-auto px-4 animate-fade-in ${!showResult ? 'text-center' : 'text-left'}`}>
          
        {!showResult ?
          <div className="flex flex-col items-center justify-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-base-content">
              What's on your mind?
            </h2>
            
            <p className="text-sm md:text-base text-base-content/40 font-normal">
              Make it clear below to start chatting with Vebble AI.
            </p>
          </div>
          :
          <div className='flex flex-col w-full space-y-6'>
            <div className='justify-end w-full flex'>
              <div className='max-w-[75%] bg-neutral text-neutral-content rounded-2xl px-4 py-3 text-sm md:text-base shadow-sm font-normal'>
                {input}
              </div>
            </div>
            <div className="flex items-start space-x-3 w-full">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              
              {/* Response Message bubble layout bubble wrapper */}
              <div className="flex-1 bg-base-200/50 text-base-content rounded-2xl px-4 py-3 text-sm md:text-base leading-relaxed font-normal border border-base-300/30">
                {isLoading ? (
                  <div className="flex items-center space-x-1.5 py-2">
                    <div className="size-2 bg-base-content/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="size-2 bg-base-content/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="size-2 bg-base-content/40 rounded-full animate-bounce"></div>
                  </div>
                ) : aiData === null ? (
                    <span className="text-error/80 font-thin">There was an error generating a response</span>
                  ) : typeof aiData === 'string' ? (
                    
                    <div className="prose prose-sm max-w-none text-base-content prose-headings:text-base-content prose-strong:text-base-content">
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => (
                            <a 
                              {...props} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary underline hover:text-primary-focus transition-colors font-medium"
                            />
                          )
                        }}
                      >
                        {aiData}
                      </ReactMarkdown>
                    </div>

                  ) : (
                    <span className="text-error/80 font-thin">Invalid data format received</span>
                  )}
              </div>
            </div>
          </div>
          }

        </div>
      </div>
      <div className="w-full bg-gradient-to-t from-base-100 via-base-100 to-transparent pt-6 pb-4 px-4 md:px-0">
        <div className="max-w-2xl md:max-w-3xl mx-auto relative">
          <form onSubmit={handleSend} className="flex items-center bg-base-200 border border-base-300 rounded-2xl p-1.5 focus-within:border-base-content/20 transition-all shadow-sm">
            <input 
              onChange={(e) => setInput(e.target.value)}
              type="text" 
              placeholder="Message Vebble AI..." 
              value={input}
              disabled = {isLoading}
              className="w-full bg-transparent px-4 py-2 text-sm md:text-base text-base-content focus:outline-none placeholder-base-content/40"
            />
            <button className="p-2 rounded-xl bg-base-content text-base-100 hover:opacity-90 transition-opacity flex items-center justify-center shrink-0"
              >
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            </button>
          </form>
          {/* Disclaimer text matching the footer footprint */}
          <p className="text-[10px] text-center text-base-content/30 mt-2 tracking-wide">
            Vebble AI can make mistakes. Verify important info.
          </p>
        </div>
      </div>

    </div>
  )
}

export default ChatSession
