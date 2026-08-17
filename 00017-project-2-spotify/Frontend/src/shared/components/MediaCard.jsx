import { Link } from 'react-router'

function MediaCard({ item, to, subtitle, compact = false, onClick }) {
  const content = (
    <article className="group flex h-full flex-col gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 hover:shadow-2xl hover:shadow-black/35">
      <div
        style={{
          background: `url(${item.poster})`,
          backgroundSize:"cover"
        }}
        className={`relative overflow-hidden rounded-[20px] ${compact ? 'aspect-square' : 'aspect-[1.12/1]'}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.24),_transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent p-3">
          <div className="text-3xl font-semibold tracking-tight text-white/90">
            {item.title?.slice(0, 1) ?? 'S'}
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="line-clamp-1 text-base font-semibold text-white">{item.title}</h3>
        <p className="line-clamp-2 text-sm text-white/60">{subtitle ?? item.description ?? item.artist ?? item.genre}</p>
      </div>
    </article>
  )

  if (to) {
    return (
      <Link className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400" to={to}>
        {content}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button
        className="block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    )
  }

  return content
}

export default MediaCard