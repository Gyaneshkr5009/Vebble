import { Check, StepBack } from "lucide-react";
import { THEMES } from "../../../constants/theme";
import { useThemeStore } from "../../../store/useThemeStore";
import { useNavigate } from "react-router-dom";
import ReusableButton from "../../../components/basic components/ReusableButton";

const ThemeSelector = () => {
    const { theme, setTheme } = useThemeStore();
    const navigate = useNavigate();

    const totalThemes = 32;
    const basePath = "/app-theme";


    //creating an array of theme objects with id and url
    const themes = [
      //adding a default theme : use for no background selection
      {
        id: 0,
        label: "Default",
        url: null,
      },
      //now the loop to create the rest of the themes
      ...Array.from({length: totalThemes}, (_, index) => ({
        id : index+1,
        label: `Theme ${index + 1}`,
        url: `${basePath}/${index + 1}.webp`,
      })),
    ]

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
        {THEMES.map((t, index) => {
          const isActive = theme === t;
          const label = t.charAt(0).toUpperCase() + t.slice(1);
          const preview = themes[index + 1]; // +1 because 0 is Default

          return (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={`
                group relative w-full aspect-square rounded-xl border
                transition-all duration-150 overflow-hidden
                ${isActive
                  ? 'border-primary shadow-md ring-1 ring-primary/40'
                  : 'border-base-300 hover:border-primary/40 hover:shadow-sm hover:-translate-y-[1px]'}
              `}
            >
              {/* ✅ THEME IMAGE PREVIEW */}
              {preview?.url ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${preview.url})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-base-200 via-base-100 to-base-300" />
              )}

              {/* Soft overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* DaisyUI color preview - floating Color Blocks*/}
              <div className="absolute top-1.5 left-1.5 right-1.5 flex gap-1 pointer-events-none">
                <div
                  data-theme={t}
                  className="h-3 flex-1 rounded bg-primary !bg-primary"
                  style={{ background: "hsl(var(--p))" }}
                ></div>
                <div
                  data-theme={t}
                  className="h-3 flex-1 rounded bg-secondary !bg-secondary"
                  style={{ background: "hsl(var(--s))" }}
                ></div>
                <div
                  data-theme={t}
                  className="h-3 flex-1 rounded bg-accent !bg-accent"
                  style={{ background: "hsl(var(--a))" }}
                ></div>
                <div
                  data-theme={t}
                  className="h-3 flex-1 rounded bg-neutral !bg-neutral"
                  style={{ background: "hsl(var(--n))" }}
                ></div>
              </div>

              {/* Name + Selected */}
              <div className="absolute inset-x-0 bottom-0 px-1.5 pb-1.5">
                <div className="flex items-center justify-between gap-1 rounded-lg bg-base-100/85 backdrop-blur px-1.5 py-1">
                  <span className="truncate text-[10px] font-medium capitalize">
                    {label}
                  </span>

                  {isActive && (
                    <Check size={12} className="text-primary" />
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