import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes , Route, Navigate } from 'react-router-dom'
import {HomePage , SignUpPage, LoginPage, SettingsPage, ProfilePage} from './pages/index.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import {useThemeStore} from './store/useThemeStore.js'
import { Toaster } from 'react-hot-toast'
import { ChatThemeSelector , ThemeSelector , PasswordChanger} from './pages/settings/features/index.js'

const App = () => {
  const{authUser,checkAuth , isCheckingAuth , onlineUsers} =  useAuthStore();
  const {theme} = useThemeStore();

  console.log({onlineUsers});

  useEffect(() => {
    checkAuth();
    // This will check if the user is authenticated when the app loads
  }, [checkAuth])

  console.log({authUser});

  //adding loading state can be useful for better user experience
  if (isCheckingAuth && !authUser) return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
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
        <Route path="/settings/password" element={<PasswordChanger />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ?<ProfilePage /> : <Navigate to="/login"/>} />
        {/* future routes if needed */}
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App