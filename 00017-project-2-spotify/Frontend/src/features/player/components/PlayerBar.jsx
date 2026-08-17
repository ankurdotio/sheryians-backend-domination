import Icon from '../../../shared/components/Icon.jsx'
import ProgressBar from './ProgressBar.jsx'
import VolumeControl from './VolumeControl.jsx'

function PlayerBar({
  currentTrack,
  isPlaying,
  onNext,
  onPrevious,
  onTogglePlay,
  onProgressChange,
  onVolumeChange,
  progress,
  volume,
}) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-zinc-950/90 px-4 py-2 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 md:flex-row md:items-center md:gap-6">
        <div className="flex min-w-0 items-center gap-3 md:w-1/4">
          <div className={`size-12 shrink-0 rounded-2xl bg-gradient-to-br ${currentTrack.coverClass} shadow-lg shadow-black/30`} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{currentTrack.title}</p>
            <p className="truncate text-xs text-white/50">{currentTrack.artist}</p>
          </div>
          <button className="ml-auto grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white md:ml-0" type="button">
            <Icon className="size-4" name="heart" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-white/55">
            <button className="grid size-9 place-items-center rounded-full transition hover:text-white" type="button">
              <Icon className="size-4" name="shuffle" />
            </button>
            <button className="grid size-9 place-items-center rounded-full transition hover:text-white" onClick={onPrevious} type="button">
              <Icon className="size-4" name="skipBack" />
            </button>
            <button
              className="grid size-10 place-items-center rounded-full bg-white text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:scale-105 hover:bg-emerald-400"
              onClick={onTogglePlay}
              type="button"
            >
              <Icon className="size-5" name={isPlaying ? 'pause' : 'play'} />
            </button>
            <button className="grid size-9 place-items-center rounded-full transition hover:text-white" onClick={onNext} type="button">
              <Icon className="size-4" name="skipForward" />
            </button>
            <button className="grid size-9 place-items-center rounded-full transition hover:text-white" type="button">
              <Icon className="size-4" name="repeat" />
            </button>
          </div>

          <div className="w-full max-w-3xl px-4">
            <ProgressBar onChange={onProgressChange} progress={progress} />
          </div>
        </div>

        <div className="hidden items-center justify-end gap-3 md:flex md:w-1/4">
          <VolumeControl onChange={onVolumeChange} volume={volume} />
        </div>
      </div>
    </footer>
  )
}

export default PlayerBar