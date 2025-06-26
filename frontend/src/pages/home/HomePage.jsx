import { useChatStore } from "../../store/useChatStore.js";
import { NoChatSelected, ChatContainer, Sidebar } from "../../components/index.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  
  return (
    <div className="h-screen bg-base-200 relative overflow-hidden">
      {/* Subtle background elements using DaisyUI classes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating chat bubbles */}
        {[...Array(8)].map((_, i) => {
          const size = Math.random() * 200 + 100;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const colorClass = i % 3 === 0 ? 'bg-primary/10' : 
                           i % 2 === 0 ? 'bg-secondary/10' : 
                           'bg-accent/10';
          const delay = Math.random() * 5;
          const duration = 20 + Math.random() * 20;
          
          return (
            <div 
              key={i}
              className={`absolute rounded-full ${colorClass} animate-float blur-xl`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
        
        {/* Grid pattern using DaisyUI classes */}
        <div className="absolute inset-0 opacity-5 bg-[length:40px_40px] bg-grid-pattern"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100/90 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] border border-base-300">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;