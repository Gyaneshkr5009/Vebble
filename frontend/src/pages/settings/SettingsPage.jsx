import { ArrowBigLeftDash ,Instagram , Facebook , Youtube } from "lucide-react";
import { THEMES } from "../../constants/theme";
import { useThemeStore } from "../../store/useThemeStore";
import { useNavigate } from "react-router-dom";

const PREVIEW_MESSAGES = [
  { id: 1, content: "👋 Hey there! Thanks for checking out my profile.", isSent: false },
  { id: 2, content: "✨ Join our growing community on YouTube and Instagram!", isSent: true },
  { id: 3, content: "📺 YouTube: @clashgamer8867", isSent: true },
  { id: 4, content: "📸 Instagram: @gyanesh100", isSent: true },
];


const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();
  const handleBack =() => {
    navigate('/login');
  }

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 pb-2 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
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
        {/* Back Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl 
                      bg-primary/80 text-primary-content hover:bg-primary 
                      transition-all duration-300"
          >
            <ArrowBigLeftDash className="w-5 h-5 text-primary-content" />
            <span className="font-semibold tracking-wide text-primary-content">Back to Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;