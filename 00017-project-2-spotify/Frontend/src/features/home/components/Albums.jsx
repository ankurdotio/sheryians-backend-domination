import MediaCard from '../../../shared/components/MediaCard.jsx'

function Albums({ items }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Albums</h2>
        <p className="mt-1 text-sm text-white/50">Full releases from artists you've been playing.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((album) => (
          <MediaCard
            key={album.id}
            item={album}
            subtitle={album.artist}
            to={`/album/${album.id}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Albums
