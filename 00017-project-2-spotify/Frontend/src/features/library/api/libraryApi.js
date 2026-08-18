import {
    addTrackToPlaylist as addTrackToPlaylistMock,
    createPlaylist as createPlaylistMock,
    mockLibraryPlaylists,
} from '../../../shared/utils/mockData.js'
import { wait } from '../../../shared/utils/mockAsync.js'
import { api } from "../../../shared/api/httpClient.js"


const coverClasses = [
    "from-emerald-500 via-teal-400 to-cyan-500",
    "from-fuchsia-500 via-rose-500 to-orange-400",
    "from-sky-500 via-indigo-500 to-violet-600",
    "from-amber-400 via-orange-500 to-rose-500",
    "from-emerald-500 via-teal-400 to-cyan-500",
    "from-fuchsia-500 via-rose-500 to-orange-400",
    "from-sky-500 via-indigo-500 to-violet-600",
    "from-amber-400 via-orange-500 to-rose-500",
    "from-emerald-500 via-teal-400 to-cyan-500",
    "from-fuchsia-500 via-rose-500 to-orange-400",
    "from-sky-500 via-indigo-500 to-violet-600",
    "from-amber-400 via-orange-500 to-rose-500",
]

export const getLibraryPlaylists = async () => {

    const playlistResponse = await api.get('/songs/playlist')

    const playlists = playlistResponse.data.data.playlists.map((playlist) => {
        return {
            id: playlist._id,
            title: playlist.title,
            savedAt: new Date(playlist.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
            owner: playlist.user.name,
            tracks: playlist.songs.map((song) => song._id),
            type: 'Playlist',
            coverClass: coverClasses[ Math.floor(Math.random() * coverClasses.length) ],
        }

    })

    return {
        playlists,
        total: mockLibraryPlaylists.length,
    }
}

export const addTrackToPlaylist = async (playlistId, trackId) => {
    console.log("Adding track to playlist", playlistId, trackId)

    await api.patch(`/songs/playlist/${playlistId}/add-song/${trackId}`)

    return {
        success: true,
    }
}

export const createPlaylist = async ({ title }) => {

    const createPlaylistResponse = await api.post('/songs/playlist', { title })

    return {
        playlist: {
            id: createPlaylistResponse.data.data.playlist._id,
            title: createPlaylistResponse.data.data.playlist.title,
            savedAt: new Date(createPlaylistResponse.data.data.playlist.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
            owner: createPlaylistResponse.data.data.playlist.user.name,
            tracks: [],
            type: 'Playlist',
            coverClass: coverClasses[ Math.floor(Math.random() * coverClasses.length) ],
        },
    }
}