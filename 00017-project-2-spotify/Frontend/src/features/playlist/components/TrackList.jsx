import { useDispatch } from 'react-redux'
import Icon from '../../../shared/components/Icon.jsx'
import { formatDuration, formatNumber } from '../../../shared/utils/format.js'
import { playTrack } from '../../player/state/playerSlice.js'
import AddToPlaylistMenu from '../../library/components/AddToPlaylistMenu.jsx'

function TrackList({ tracks }) {
  const dispatch = useDispatch()

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="border-b border-white/10 px-4 py-4 sm:px-6">
        <div className="grid grid-cols-[2rem_1fr_1fr_7rem_2.5rem] gap-4 text-xs font-medium uppercase tracking-[0.26em] text-white/40">
          <span>#</span>
          <span>Title</span>
          <span className="hidden md:block">Album</span>
          <span className="text-right">Duration</span>
          <span />
        </div>
      </div>
      <div className="divide-y divide-white/5">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="grid w-full cursor-pointer grid-cols-[2rem_1fr_1fr_7rem_2.5rem] items-center gap-4 px-4 py-4 text-left text-sm transition hover:bg-white/5 sm:px-6"
            onClick={() => dispatch(playTrack(track))}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                dispatch(playTrack(track))
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center text-white/40">{track.trackNumber}</div>
            <div className="flex min-w-0 items-center gap-3">
              <div className={`size-11 shrink-0 rounded-xl bg-gradient-to-br ${track.coverClass}`} />
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{track.title}</p>
                <p className="truncate text-xs text-white/45">{track.artist}</p>
              </div>
            </div>
            <div className="hidden items-center text-white/55 md:flex">{track.album}</div>
            <div className="flex items-center justify-end gap-3 text-white/55">
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-xs uppercase tracking-[0.2em] text-white/35">
                <Icon className="size-3" name="heart" />
                {formatNumber(track.plays)}
              </span>
              <span>{formatDuration(track.duration)}</span>
            </div>
            <div className="flex items-center justify-end">
              <AddToPlaylistMenu track={track} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrackList