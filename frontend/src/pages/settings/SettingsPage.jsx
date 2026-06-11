import { StepBack ,Instagram , Facebook , Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReusableButton from "../../components/basic components/ReusableButton";
import { Lock , PaintbrushVertical , Wallpaper } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "👋 Hey there! Thanks for checking out my profile.", isSent: false },
  { id: 2, content: "✨ Join our growing community on YouTube and Instagram!", isSent: true },
  { id: 3, content: "📺 YouTube: @clashgamer8867", isSent: true },
  { id: 4, content: "📸 Instagram: @gyanesh100", isSent: true },
];


const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen container px-4 pt-20 pb-2 min-w-full">
      {/* Back Button */}
      <div className="pt-2 flex justify-start mb-4">
        <ReusableButton
          onClick={() => navigate('/')}
          icon={StepBack}
        >
          Home
        </ReusableButton>
      </div>
      {/* setting page feature */}
      <div className="space-y-6">
        {/* Minimal Feature Buttons Section */}
        <h3 className="text-lg font-semibold mb-3">Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {/* Theme Button */}
          <div className="p-4 rounded-xl border border-base-300 bg-base-200/40 hover:bg-base-200/80 transition-all duration-200 flex flex-col justify-between gap-5 group">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform shrink-0">
                <PaintbrushVertical className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-sm truncate">Interface Theme</h4>
                <p className="text-xs text-base-content/60 mt-0.5 line-clamp-2">Change app colors and accents</p>
              </div>
            </div>
            <ReusableButton
              onClick={() => navigate('/settings/theme')}
              className="w-full btn-primary btn-sm rounded-lg"
            >
              Configure
            </ReusableButton>
          </div>

          {/* Background Button */}
          <div className="p-4 rounded-xl border border-base-300 bg-base-200/40 hover:bg-base-200/80 transition-all duration-200 flex flex-col justify-between gap-5 group">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:scale-105 transition-transform shrink-0">
                <Wallpaper className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-sm truncate">Chat Wallpaper</h4>
                <p className="text-xs text-base-content/60 mt-0.5 line-clamp-2">Update message window context</p>
              </div>
            </div>
            <ReusableButton
              onClick={() => navigate('/settings/chat-theme')}
              className="w-full btn-secondary btn-sm rounded-lg"
            >
              Change Theme
            </ReusableButton>
          </div>
          {/* Change Password */}
          <div className="p-4 rounded-xl border border-base-300 bg-base-200/40 hover:bg-base-200/80 transition-all duration-200 flex flex-col justify-between gap-5 group">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:scale-105 transition-transform shrink-0">
                <Lock className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-sm truncate">About Us & Rules</h4>
                <p className="text-xs text-base-content/60 mt-0.5 line-clamp-2">Review product security notes</p>
              </div>
            </div>
            <ReusableButton
              onClick={() => navigate('/settings/about-us')}
              className="w-full btn-accent btn-sm rounded-lg"
            >
              Read More
            </ReusableButton>
          </div>

          {/* more buttons can be added here */}
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;