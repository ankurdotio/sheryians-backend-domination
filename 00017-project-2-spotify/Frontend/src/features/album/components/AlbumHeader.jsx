import { useDispatch } from 'react-redux'
import Icon from '../../../shared/components/Icon.jsx'
import { playTrack } from '../../player/state/playerSlice.js'

function AlbumHeader({ album }) {
  const dispatch = useDispatch()

  return (
    <section className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
        <div className={`size-44 shrink-0 rounded-[32px] bg-gradient-to-br ${album.coverClass} shadow-2xl shadow-black/30`} />
        <div className="flex-1 space-y-4">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Album</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{album.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
            <span>By {album.artist}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>{album.tracks.length} tracks</span>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
              onClick={() => album.tracks[0] && dispatch(playTrack(album.tracks[0]))}
              type="button"
            >
              <Icon className="size-4" name="play" />
              Play
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AlbumHeader
