import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2">
            {/* Icon wrapper */}
            <div className="p-2 bg-primary/10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>

            {/* Text */}
            <span className="text-primary font-bold text-xl tracking-wide">
              Vebble
            </span>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Welcome to Chatty!</h2>
          <p className="text-base-content/60 text-sm md:text-base leading-relaxed">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/40">Checkout other Services</h3>
          <div>
            <Link to={"/vebbleAi"} className="btn btn-md btn-outline gap-2 transition-colors">
              <BrainCircuit className="w-4 h-4"/>
              <span>VebbleAi</span>
            </Link>
          </div>
        </div>

      </div>
    </div>

  );
};

export default NoChatSelected;