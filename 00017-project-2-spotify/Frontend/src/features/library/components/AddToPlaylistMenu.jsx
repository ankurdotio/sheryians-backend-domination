import { useEffect, useRef, useState } from 'react'
import Icon from '../../../shared/components/Icon.jsx'
import { useLibraryData } from '../hooks/useLibraryData.js'
import { addTrackToPlaylist } from '../api/libraryApi.js'

function AddToPlaylistMenu({ track }) {
  const { playlists } = useLibraryData()
  const [isOpen, setIsOpen] = useState(false)
  const [addedPlaylistId, setAddedPlaylistId] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleToggle = (event) => {
    event.stopPropagation()
    setIsOpen((open) => !open)
  }

  const handleAdd = async (event, playlist) => {
    event.stopPropagation()
    await addTrackToPlaylist(playlist.id, track.id)
    setAddedPlaylistId(playlist.id)

    window.setTimeout(() => {
      setIsOpen(false)
      setAddedPlaylistId(null)
    }, 900)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-label="Add to playlist"
        className="grid size-8 place-items-center rounded-full bg-black/45 text-white/70 backdrop-blur transition hover:bg-black/70 hover:text-white"
        onClick={handleToggle}
        type="button"
      >
        <Icon className="size-4" name="plus" />
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-1.5 text-left shadow-2xl shadow-black/40"
          onClick={(event) => event.stopPropagation()}
        >
          <p className="px-2.5 py-1.5 text-xs uppercase tracking-[0.24em] text-white/35">Add to playlist</p>
          {playlists.length === 0 ? (
            <p className="px-2.5 py-2 text-sm text-white/50">No playlists yet.</p>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist.id}
                className="flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
                onClick={(event) => handleAdd(event, playlist)}
                type="button"
              >
                <span className="truncate">{playlist.title}</span>
                {addedPlaylistId === playlist.id ? <span className="text-xs text-emerald-400">Added</span> : null}
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  )
}

export default AddToPlaylistMenu
