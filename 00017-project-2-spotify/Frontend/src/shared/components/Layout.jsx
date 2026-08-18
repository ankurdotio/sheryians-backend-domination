import { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'
import { useLibraryData } from '../../features/library/hooks/useLibraryData.js'
import PlayerBar from '../../features/player/components/PlayerBar.jsx'
import { usePlayerControls } from '../../features/player/hooks/usePlayerControls.js'
import { useUser } from '../../features/user/hooks/useUser.js'
import AuthModal from '../../features/user/components/AuthModal.jsx'

function Layout() {
  const {
    user,
    isAuthenticated,
    status,
    error,
    login,
    register,
  } = useUser()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { playlists, createPlaylist, createStatus, createError } = useLibraryData()
  const { currentTrack, isPlaying, progress, volume, togglePlay, nextTrack, previousTrack, setProgress, setVolume } =
    usePlayerControls()

  const handleLogin = async (payload) => {
    const response = await login(payload)
    setIsAuthModalOpen(false)
    return response
  }

  const handleRegister = async (payload) => {
    const response = await register(payload)
    setIsAuthModalOpen(false)
    return response
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(29,185,84,0.16),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_18%),linear-gradient(180deg,_#090909_0%,_#040404_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.06),_transparent_35%)]" />
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <Sidebar
          createError={createError}
          createStatus={createStatus}
          onCreatePlaylist={createPlaylist}
          playlists={playlists}
        />
        <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
          <Navbar
            isAuthenticated={isAuthenticated}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            status={status}
            user={user}
          />
          <main className="flex-1 px-4 pb-48 pt-5 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1600px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <AuthModal
        key={isAuthModalOpen ? 'auth-open' : 'auth-closed'}
        error={error}
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        status={status}
      />
      <PlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onNext={nextTrack}
        onPrevious={previousTrack}
        onTogglePlay={togglePlay}
        onProgressChange={setProgress}
        onVolumeChange={setVolume}
        progress={progress}
        volume={volume}
      />
    </div>
  )
}

export default Layout