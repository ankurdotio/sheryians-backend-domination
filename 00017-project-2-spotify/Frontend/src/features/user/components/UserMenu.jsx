function UserMenu({ user, isAuthenticated }) {

  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-2 pl-2 shadow-lg shadow-black/20">
      <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-semibold text-zinc-950">
        {user?.name
          ?.split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join('') || 'U'}
      </div>
      <div className="hidden pr-2 text-left sm:block">
        <p className="text-sm font-semibold text-white">{user?.name ?? 'Guest Listener'}</p>
        <p className="text-xs text-white/45">{isAuthenticated ? user?.email : 'Not signed in'}</p>
      </div>
    </div>
  )
}

export default UserMenu