import { useParams } from 'react-router'
import PlaylistHeader from '../components/PlaylistHeader.jsx'
import TrackList from '../components/TrackList.jsx'
import { usePlaylistData } from '../hooks/usePlaylistData.js'

function PlaylistPage() {
  const { id } = useParams()
  const { playlist } = usePlaylistData(id)

  if (!playlist) {
    return (
      <div className="grid min-h-[50svh] place-items-center rounded-[28px] border border-white/10 bg-white/5 text-white/50 shadow-2xl shadow-black/30 backdrop-blur-xl">
        Loading playlist...
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      <PlaylistHeader playlist={playlist} />
      <TrackList tracks={playlist.tracks} />
    </div>
  )
}

export default PlaylistPage