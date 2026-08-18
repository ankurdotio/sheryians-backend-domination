import {
    addTrackToPlaylist as addTrackToPlaylistMock,
    createPlaylist as createPlaylistMock,
    mockLibraryPlaylists,
} from '../../../shared/utils/mockData.js'
import { wait } from '../../../shared/utils/mockAsync.js'

export const getLibraryPlaylists = async () =>
    wait({
        playlists: [ ...mockLibraryPlaylists ],
        total: mockLibraryPlaylists.length,
    })

export const addTrackToPlaylist = async (playlistId, trackId) =>
    wait(addTrackToPlaylistMock(playlistId, trackId))

export const createPlaylist = async ({ title }) =>
    wait({ playlist: createPlaylistMock(title) })