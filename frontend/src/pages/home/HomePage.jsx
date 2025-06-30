import { useChatStore } from "../../store/useChatStore.js";
import { NoChatSelected, ChatContainer, Sidebar } from "../../components/index.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  
  return (
    <div className="h-screen bg-base-200 relative overflow-hidden">
      {/* Subtle background elements using DaisyUI classes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base layer - ensures contrast */}
        <div className="absolute inset-0 bg-base-100/50 dark:bg-base-300/50" />
        
        {/* High-visibility grid - uses primary color instead of primary-content */}
        <div
          className="absolute inset-0 opacity-30 dark:opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(var(--fallback-p,oklch(var(--p)/0.6)) 1px, transparent 1px),
              linear-gradient(90deg, var(--fallback-p,oklch(var(--p)/0.6)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '-19px -19px',
            mixBlendMode: 'screen' // Makes light colors pop on dark backgrounds
          }}
        />
        
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