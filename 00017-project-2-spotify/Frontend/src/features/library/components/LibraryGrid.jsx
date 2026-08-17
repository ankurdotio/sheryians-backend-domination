import MediaCard from '../../../shared/components/MediaCard.jsx'

function LibraryGrid({ playlists, viewMode }) {
  return (
    <div className={viewMode === 'list' ? 'space-y-3' : 'grid gap-4 sm:grid-cols-2 xl:grid-cols-4'}>
      {playlists.map((playlist) => (
        <MediaCard
          key={playlist.id}
          item={playlist}
          subtitle={viewMode === 'list' ? playlist.savedAt : playlist.description}
          to={`/playlist/${playlist.id}`}
        />
      ))}
    </div>
  )
}

export default LibraryGrid