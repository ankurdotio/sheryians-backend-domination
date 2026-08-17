import { addTrackToPlaylist as addTrackToPlaylistMock, mockLibraryPlaylists } from '../../../shared/utils/mockData.js'
import { wait } from '../../../shared/utils/mockAsync.js'

export const getLibraryPlaylists = async () =>
    wait({
        playlists: mockLibraryPlaylists,
        total: mockLibraryPlaylists.length,
    })

export const addTrackToPlaylist = async (playlistId, trackId) =>
    wait(addTrackToPlaylistMock(playlistId, trackId))