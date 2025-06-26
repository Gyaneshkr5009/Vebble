import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 animate-bounce">
            {/* Icon wrapper */}
            <div className="p-2 bg-primary/10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>

            {/* Text */}
            <span className="text-primary font-semibold text-lg tracking-wide">
              Vebble
            </span>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;