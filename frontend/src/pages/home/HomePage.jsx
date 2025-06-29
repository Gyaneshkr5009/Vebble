import { useChatStore } from "../../store/useChatStore.js";
import { NoChatSelected, ChatContainer, Sidebar } from "../../components/index.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  
  return (
    <div className="h-screen bg-base-200 relative overflow-hidden">
      {/* Subtle background elements using DaisyUI classes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft multi-tone radial background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-200/40 via-base-100/10 to-transparent dark:from-base-300/40 dark:via-base-200/10 dark:to-transparent"></div>

        {/* Diagonal moving stripes */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,theme(colors.base-content/5)_0px,theme(colors.base-content/5)_1px,transparent_1px,transparent_35px)] animate-background-stripes opacity-30"></div>

        {/* Blurred glass orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-primary/15 dark:bg-primary/25 rounded-full blur-[80px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/15 dark:bg-secondary/25 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>

        {/* Optional center ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 dark:bg-accent/20 rounded-full blur-[120px] animate-pulse-slow delay-1500"></div>
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