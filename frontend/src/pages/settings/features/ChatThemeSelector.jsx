import { useChatThemeStore } from '../../../store/useChatThemeStore'
import ReusableButton from '../../../components/basic components/ReusableButton'
import { StepBack , Loader } from 'lucide-react'
import { useNavigate  } from 'react-router-dom'

const ChatThemeSelector = () => {

  const {theme ,setBackground} = useChatThemeStore();
  const navigate = useNavigate();

  const totalThemes = 22;
  const basePath = "/chat-theme";

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
    <div className='min-h-screen container mx-auto px-4 pt-20 pb-2 max-w-5xl'>
      {/* Back Button */}
      <div className="pt-2 flex justify-start mb-4">
        <ReusableButton
          onClick={() => navigate('/settings')}
          icon={StepBack}
        >
          Back
        </ReusableButton>
      </div>
      {/* Theme Images*/}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 pl-4 pr-4">
        {themes.map((bg) => (
          <div
            key={bg.id}
            onClick={() => setBackground(bg.url)}
            className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 hover:border-primary hover:opacity-90  ${
              theme === bg.url
              ? "border-primary ring-1 ring-primary scale-105 shadow-lg "
              : "border-transparent"
            }`}
          >
            {/* using ternary Operator as true and false means {if bg.url is not null then theme selected other wise not} */}
            {bg.url ? (
              <div
                className="w-full h-40 bg-cover bg-center "
                style={{ backgroundImage: `url(${bg.url})` }}
              />
            ) : (
              <div className="w-full h-40 bg-base-200 flex group items-center justify-center">
                <Loader className="motion-safe:animate-pulse group-hover:block text-base-content" size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatThemeSelector