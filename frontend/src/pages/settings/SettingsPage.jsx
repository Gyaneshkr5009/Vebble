import { useNavigate } from "react-router-dom";
import ReusableButton from "../../components/basic components/ReusableButton";
import { Lock , PaintbrushVertical , Wallpaper , StepBack , Gamepad2 } from "lucide-react";


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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Theme Button */}
          <div className="p-4 rounded-xl border border-base-300 bg-base-200/40 hover:bg-base-200/80 transition-all duration-200 flex flex-col justify-between gap-5 group">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary/90 group-hover:scale-105 transition-transform shrink-0">
                <PaintbrushVertical className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-sm truncate">Interface Theme</h4>
                <p className="text-xs text-base-content/60 mt-0.5 line-clamp-2">Change app colors and accents</p>
              </div>
            </div>
            <ReusableButton
              onClick={() => navigate('/settings/theme')}
              className="w-full btn-accent btn-sm rounded-lg"
            >
              Configure
            </ReusableButton>
          </div>

          {/* Background Button */}
          <div className="p-4 rounded-xl border border-base-300 bg-base-200/40 hover:bg-base-200/80 transition-all duration-200 flex flex-col justify-between gap-5 group">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary/90 group-hover:scale-105 transition-transform shrink-0">
                <Wallpaper className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-sm truncate">Chat Wallpaper</h4>
                <p className="text-xs text-base-content/60 mt-0.5 line-clamp-2">Update message window context</p>
              </div>
            </div>
            <ReusableButton
              onClick={() => navigate('/settings/chat-theme')}
              className="w-full btn-accent btn-sm rounded-lg"
            >
              Change Theme
            </ReusableButton>
          </div>
          {/* Games */}
          <div className="p-4 rounded-xl border border-base-300 bg-base-200/40 hover:bg-base-200/80 transition-all duration-200 flex flex-col justify-between gap-5 group">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary/90 group-hover:scale-105 transition-transform shrink-0">
                <Gamepad2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-sm truncate">Games Zone</h4>
                <p className="text-xs text-base-content/60 mt-0.5 line-clamp-2">Explore the arcade collections.</p>
              </div>
            </div>
            <ReusableButton
              onClick={() => navigate('/games/')}
              className="w-full btn-accent btn-sm rounded-lg"
            >
              Enter Arcade
            </ReusableButton>
          </div>
          {/* Change Password */}
          <div className="p-4 rounded-xl border border-base-300 bg-base-200/40 hover:bg-base-200/80 transition-all duration-200 flex flex-col justify-between gap-5 group">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary/90 group-hover:scale-105 transition-transform shrink-0">
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