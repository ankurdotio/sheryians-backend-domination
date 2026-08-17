import { Link, NavLink } from 'react-router'
import Icon from './Icon.jsx'

const navItems = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/library', label: 'Your Library', icon: 'library' },
]

function Sidebar({ playlists = [] }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-zinc-950/85 px-4 py-5 backdrop-blur-2xl lg:flex lg:flex-col">
      <Link className="flex items-center gap-3 px-2 text-white" to="/">
        <span className="grid size-11 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-400 shadow-lg shadow-emerald-500/15">
          <Icon className="size-5" name="play" />
        </span>
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/45">
            Spotify
          </p>
          <p className="text-sm text-white/70">UI-only workspace</p>
        </div>
      </Link>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                isActive
                  ? 'bg-black text-zinc-950 shadow-lg shadow-black/20'
                  : 'text-white/70 hover:bg-white/7 hover:text-white',
              ].join(' ')
            }
            end={item.to === '/'}
            to={item.to}
          >
            <Icon className="size-5" name={item.icon} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 flex items-center justify-between px-2 text-xs uppercase tracking-[0.3em] text-white/35">
        <span>Playlists</span>
        <Icon className="size-4 text-white/35" name="plus" />
      </div>

      <div className="mt-3 flex-1 space-y-1 overflow-y-auto pr-1">
        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            className="flex items-center gap-3 rounded-2xl px-3 py-2 transition hover:bg-white/7"
            to={`/playlist/${playlist.id}`}
          >
            <div className={`size-12 rounded-2xl bg-gradient-to-br ${playlist.coverClass} shadow-lg shadow-black/25`} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{playlist.title}</p>
              <p className="truncate text-xs text-white/45">{playlist.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar