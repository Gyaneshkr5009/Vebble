import React, { useContext, useRef, useState} from 'react'
import { vebbleAiBackendContext } from '../../constants/VebbleAiContext';
import { MessageCircle , Copy, Check, Share, Circle, Loader2, Share2} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ChatSession() {
   const {sendPromptToSpring , aiData , input , setInput , showResult,isLoading} = useContext(vebbleAiBackendContext);
   const [copyStatus, setCopyStatus] = useState(false);
   const [shareStaus , setShareStatus] = useState(false);
   const [actionLoading, setActionLoading] = useState({ type: null, active: false });

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

   const handleActionOnResponse = async (actionType) => {
      if (actionLoading.active) return; 
      
      setActionLoading({ type: actionType, active: true });
      
      try {
          if (actionType === "copy") {
              await navigator.clipboard.writeText(aiData);
              
              setCopyStatus(true); 
              setTimeout(() => {
                  setCopyStatus(false);
              }, 2000);
              
          } else if (actionType === "share") {
              if (navigator.share) {
                  await navigator.share({
                      title: 'Vebble AI Response',
                      text: aiData,
                      url: window.location.href
                  });
                  setShareStatus(true);
                  setTimeout(() => setShareStatus(false), 2000);
              } else {
                  await navigator.clipboard.writeText(aiData);
                  alert("Share link copied to clipboard instead!");
              }
          }
      } catch (err) {
          console.error("Action handler exception:", err);
      } finally {
          setActionLoading({ type: null, active: false });
      }
  };

  
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
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props}) => (
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
                      <div className='flex justify-end items-center mt-3 pt-1 w-full bg-transparent rounded-lg'>
                        <button 
                            onClick={() => handleActionOnResponse("copy")} // 🚀 MAGIC HERE: Direct value parameter bhej di!
                            className={`btn btn-sm btn-ghost rounded-full p-2 min-h-0 h-8 w-8 text-base-content/50 hover:text-primary hover:bg-base-300/40 transition-all duration-200`}
                            disabled={copyStatus}
                            title={copyStatus ? "Copied!" : "Copy to Clipboard"}
                          >
                            {actionLoading.active && actionLoading.type === "copy" ? (
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                              ) : copyStatus ? (
                                <Check className="w-4 h-4 text-success scale-110 transition-transform duration-200" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                          </button>

                           <button 
                              onClick={() => handleActionOnResponse("share")} 
                              className="btn btn-sm btn-ghost rounded-full p-2 min-h-0 h-8 w-8 text-base-content/50 hover:text-primary hover:bg-base-300/40 transition-all duration-200"
                              title="Share Response"
                              disabled={actionLoading.active}
                            >
                              {/* 🚀 FIX 4: Fixed the typo from 'shareStaus' to 'shareStatus' */}
                              {actionLoading.active && actionLoading.type === "share" ? (
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                              ) : shareStaus ? ( 
                                <Check className="w-4 h-4 text-success scale-110" />
                              ) : (
                                <Share2 className="w-4 h-4" />
                              )}
                            </button>
                      </div>
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
