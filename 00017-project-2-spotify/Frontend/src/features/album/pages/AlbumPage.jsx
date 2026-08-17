import { useParams } from 'react-router'
import AlbumHeader from '../components/AlbumHeader.jsx'
import TrackList from '../../playlist/components/TrackList.jsx'
import { useAlbumData } from '../hooks/useAlbumData.js'

function AlbumPage() {
  const { id } = useParams()
  const { album } = useAlbumData(id)

  if (!album) {
    return (
      <div className="grid min-h-[50svh] place-items-center rounded-[28px] border border-white/10 bg-white/5 text-white/50 shadow-2xl shadow-black/30 backdrop-blur-xl">
        Loading album...
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      <AlbumHeader album={album} />
      <TrackList tracks={album.tracks} />
    </div>
  )
}

export default AlbumPage
