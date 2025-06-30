import { useChatStore } from "../../store/useChatStore.js";
import { NoChatSelected, ChatContainer, Sidebar } from "../../components/index.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  
  return (
    <div className="h-screen bg-base-200 relative overflow-hidden">
      {/* Subtle background elements using DaisyUI classes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base layer using DaisyUI theme variables */}
        <div className="absolute inset-0 bg-base-100/90 dark:bg-base-300/90" />
        
        {/* Theme-adaptive grid pattern */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(var(--fallback-pc,oklch(var(--pc)/0.5)) 1px, transparent 1px),
              linear-gradient(90deg, var(--fallback-pc,oklch(var(--pc)/0.5)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '-19px -19px'
          }}
        />
        
        {/* Theme-adaptive border accents */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
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