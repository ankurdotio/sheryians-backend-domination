import Icon from '../../../shared/components/Icon.jsx'
import { formatNumber } from '../../../shared/utils/format.js'

function PlaylistHeader({ playlist }) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
        <div className={`size-44 shrink-0 rounded-[32px] bg-gradient-to-br ${playlist.coverClass} shadow-2xl shadow-black/30`} />
        <div className="flex-1 space-y-4">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Playlist</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{playlist.title}</h1>
          <p className="max-w-3xl text-base leading-7 text-white/60 sm:text-lg">{playlist.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
            <span>By {playlist.owner}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>{formatNumber(playlist.followers)} saves</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>{playlist.type}</span>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300" type="button">
              <Icon className="size-4" name="play" />
              Play
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white" type="button">
              Follow
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlaylistHeader