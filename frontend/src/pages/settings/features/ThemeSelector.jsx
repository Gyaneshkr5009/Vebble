import { Check, StepBack } from "lucide-react";
import { THEMES } from "../../../constants/theme";
import { useThemeStore } from "../../../store/useThemeStore";
import { useNavigate } from "react-router-dom";
import ReusableButton from "../../../components/basic components/ReusableButton";

const ThemeSelector = () => {
    const { theme, setTheme } = useThemeStore();
    const navigate = useNavigate();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 pb-4 max-w-5xl">
      <div className="pt-2 flex justify-start mb-4">
        <ReusableButton
          onClick={() => navigate('/settings')}
          icon={StepBack}
        >
          Back
        </ReusableButton>
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-lg font-semibold">Theme</h2>
        <p className="text-sm text-base-content/70">
          Choose a theme for your chat interface
        </p>
      </div>

      {/* compact square grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
        {THEMES.map((t) => {
          const isActive = theme === t;
          const label = t.charAt(0).toUpperCase() + t.slice(1);

          return (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={`
                group relative w-full aspect-square rounded-xl border text-left
                transition-all duration-150 overflow-hidden
                ${isActive
                  ? 'border-primary shadow-md ring-1 ring-primary/40'
                  : 'border-base-300 hover:border-primary/40 hover:shadow-sm hover:-translate-y-[1px]'}
              `}
            >
              {/* "image" background */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-base-200 via-base-100 to-base-300 group-hover:brightness-110"
              />

              {/* color strip over image */}
              <div
                className="absolute top-1.5 left-1.5 right-1.5 flex gap-1"
              >
                <div className="h-3 flex-1 rounded bg-primary" />
                <div className="h-3 flex-1 rounded bg-secondary" />
                <div className="h-3 flex-1 rounded bg-accent" />
                <div className="h-3 flex-1 rounded bg-neutral" />
              </div>

              {/* name + selected badge at bottom */}
              <div className="absolute inset-x-0 bottom-0 px-1.5 pb-1.5">
                <div className="flex items-center justify-between gap-1 rounded-lg bg-base-100/85 backdrop-blur px-1.5 py-1">
                  <span className="truncate text-[10px] font-medium capitalize text-base-content">
                    {label}
                  </span>
                  {isActive && (
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">
                      Selected
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  )
}

export default ThemeSelector