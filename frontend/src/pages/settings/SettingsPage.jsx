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
    <div className="min-h-screen container mx-auto px-4 pt-20 pb-2 max-w-5xl">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Theme Button */}
          <ReusableButton
            onClick={() => navigate('/settings/theme')}
            icon={PaintbrushVertical }
          >
            Theme
          </ReusableButton>

          {/* Background Button */}
          <ReusableButton
            onClick={() => navigate('/settings/chat-theme')}
            icon={Wallpaper}
          >
            Chat Theme
          </ReusableButton>
          {/* Change Password */}
          <ReusableButton onClick={() => navigate('/settings/password')}
            icon = {Lock}
          >
            Change Password
          </ReusableButton>

          {/* more buttons can be added here */}
        </div>
        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      G
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Gyanesh Kumar</h3>
                      <p className="text-xs text-base-content/70">Community Admin</p>
                    </div>
                  </div>
                </div>
                {/* Chat Message */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-base-200">
                      <p className="text-sm font-medium">🎉 Hey there!</p>
                      <p className="text-sm">
                        Join our awesome community and stay connected for updates, tips, and more!
                      </p>
                      <p className="text-[10px] mt-1.5 text-base-content/70">Just now</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-base-200 flex gap-4 items-center">
                      {/* Floating Icons */}
                      <a
                        href="https://www.instagram.com/revnation.future/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:scale-110 transition transform"
                      >
                        <Instagram size={20} />
                      </a>
                      <a
                        href="https://www.facebook.com/gyanesh.kumar.796569"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:scale-110 transition transform"
                      >
                        <Facebook size={20} />
                      </a>
                      <a
                        href="https://www.youtube.com/@clashgamer8867"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:scale-110 transition transform"
                      >
                        <Youtube size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;