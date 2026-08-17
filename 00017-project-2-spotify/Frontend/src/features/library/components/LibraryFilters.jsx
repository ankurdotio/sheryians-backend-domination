import Icon from '../../../shared/components/Icon.jsx'

function LibraryFilters({ total, viewMode, onViewModeChange }) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-emerald-400/80">Library</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Saved playlists and your mock catalog.</h1>
        <p className="mt-2 text-sm text-white/50">{total} playlists saved locally in the UI state.</p>
      </div>
      <div className="inline-flex rounded-full border border-white/10 bg-zinc-950/80 p-1">
        <button
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
            viewMode === 'grid' ? 'bg-emerald-400 text-zinc-950' : 'text-white/60 hover:text-white'
          }`}
          onClick={() => onViewModeChange('grid')}
          type="button"
        >
          <Icon className="size-4" name="grid" />
          Grid
        </button>
        <button
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
            viewMode === 'list' ? 'bg-emerald-400 text-zinc-950' : 'text-white/60 hover:text-white'
          }`}
          onClick={() => onViewModeChange('list')}
          type="button"
        >
          <Icon className="size-4" name="list" />
          List
        </button>
      </div>
    </div>
  )
}

export default LibraryFilters