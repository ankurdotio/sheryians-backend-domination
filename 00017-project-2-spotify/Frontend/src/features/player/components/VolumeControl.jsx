import Icon from '../../../shared/components/Icon.jsx'

function VolumeControl({ volume, onChange }) {
  return (
    <div className="flex w-full max-w-52 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/65">
      <Icon className="size-4 shrink-0" name="volume" />
      <input
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-400"
        max="100"
        min="0"
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        value={volume}
      />
      <span className="w-8 text-right text-xs tabular-nums">{volume}</span>
    </div>
  )
}

export default VolumeControl