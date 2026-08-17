import { useMemo } from 'react'
import { Link, useLocation } from 'react-router'
import Icon from './Icon.jsx'
import LoginButton from '../../features/user/components/LoginButton.jsx'
import UserMenu from '../../features/user/components/UserMenu.jsx'

const routeTitles = {
  '/': 'Home',
  '/library': 'Library',
}

function Navbar({ user, isAuthenticated, onOpenAuth, status }) {
  const location = useLocation()

  const title = useMemo(() => {
    if (location.pathname.startsWith('/playlist/')) {
      return 'Playlist'
    }

    return routeTitles[location.pathname] ?? 'Spotify'
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/70 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-white/50 lg:hidden">
            <Link
              className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5"
              to="/"
            >
              <Icon className="size-5" name="play" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">Spotify</p>
              <h1 className="text-lg font-semibold text-white">{title}</h1>
            </div>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-emerald-400/70">Now browsing</p>
              <h1 className="text-xl font-semibold text-white">{title}</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <LoginButton isAuthenticated={isAuthenticated} onOpenAuth={onOpenAuth} status={status} />
          <UserMenu isAuthenticated={isAuthenticated} user={user} />
        </div>
      </div>
    </header>
  )
}

export default Navbar