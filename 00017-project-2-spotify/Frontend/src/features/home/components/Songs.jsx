import { useDispatch } from 'react-redux'
import MediaCard from '../../../shared/components/MediaCard.jsx'
import AddToPlaylistMenu from '../../library/components/AddToPlaylistMenu.jsx'
import { playTrack } from '../../player/state/playerSlice.js'

function Songs({ items }) {
  const dispatch = useDispatch()

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">We Think You'll Like</h2>
        <p className="mt-1 text-sm text-white/50">Your latest mock sessions, ready to revisit.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((track) => (
          <MediaCard
            key={track.id}
            action={<AddToPlaylistMenu track={track} />}
            compact
            item={track}
            subtitle={`${track.artist} • ${track.album}`}
            onClick={() => dispatch(playTrack(track))}
          />
        ))}
      </div>
    </section>
  )
}

export default Songs