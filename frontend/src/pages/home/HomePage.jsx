import { useChatStore } from "../../store/useChatStore.js";
import { NoChatSelected, ChatContainer, Sidebar } from "../../components/index.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  
  return (
    <div className="h-screen bg-base-200 relative overflow-hidden">
      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center pt-16  h-full pb-0.5">
        <div className="bg-base-100/90 backdrop-blur-sm shadow-xl w-full h-full border border-base-300">
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