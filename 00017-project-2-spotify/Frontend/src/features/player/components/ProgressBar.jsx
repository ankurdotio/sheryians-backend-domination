function ProgressBar({ progress, onChange }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.26em] text-white/35">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <input
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-400"
        max="100"
        min="0"
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        value={progress}
      />
    </div>
  )
}

export default ProgressBar