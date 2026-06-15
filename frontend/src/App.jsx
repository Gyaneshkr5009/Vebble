import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes , Route, Navigate } from 'react-router-dom'
import {HomePage , SignUpPage,VebbleAi, LoginPage, SettingsPage, ProfilePage} from './pages/index.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import {useThemeStore} from './store/useThemeStore.js'
import { Toaster } from 'react-hot-toast'
import { MessageCircle } from 'lucide-react'
import { ChatThemeSelector , ThemeSelector , AboutUs} from './pages/settings/features/index.js'
import {Sudoku , Games} from './pages/settings/games/index.js'

const App = () => {
  const{authUser,checkAuth , isCheckingAuth , onlineUsers} =  useAuthStore();
  const {theme} = useThemeStore();
  const [showSplash , setShowSplash] = useState(true);

  console.log({onlineUsers});

  useEffect(() => {
    checkAuth();

    const timer = setTimeout(() => {
      setShowSplash(false);
    },2500);

    return () => clearTimeout(timer);
    // This will check if the user is authenticated when the app loads
  }, [checkAuth])

  console.log({authUser});

  //adding loading state can be useful for better user experience
  if (showSplash || (isCheckingAuth && !authUser)) return (
    <div className="flex flex-col h-screen justify-between items-center bg-base-100 py-16 animate-fade-in" data-theme={theme}>
      <div className="h-4 w-4 invisible"></div>

      <div className="flex flex-col items-center text-center">
        <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 shadow-sm">
          <MessageCircle className="w-11 h-11 text-primary" />
        </div>
        
        <h1 className="text-4xl font-black tracking-tight text-base-content">
          Vebble
        </h1>
        <p className="text-base-content/50 text-xs font-semibold tracking-widest mt-2 uppercase">
          Connecting to the world
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex space-x-2.5 items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary/80 animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        
        <span className="text-[10px] text-base-content/30 font-bold tracking-[0.2em] uppercase">
          From Vebble Labs
        </span>
      </div>
    </div>

  );

  return (
    <div className="" data-theme={theme}>
      <Navbar />

      {/* Routes goes here */}
      <Routes>
        {/* one issue if we reload the page for a second loading animation appears to prevent from popping;
            we will check if the user is authenticated and then render the loading animation for that we add authUser before HomePage
        */}
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ?<SignUpPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings/theme" element={<ThemeSelector />} />
        <Route path="/settings/chat-theme" element={<ChatThemeSelector />} />
        <Route path="/settings/about-us" element={<AboutUs />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ?<ProfilePage /> : <Navigate to="/login"/>} />
        <Route path='/vebbleAi' element={authUser ? <VebbleAi /> : <Navigate to="/login"/>} />
        <Route path='/games' element = {<Games />}/>
        <Route path='/games/sudoku' element= {<Sudoku/>} />
        {/* future routes if needed */}
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App