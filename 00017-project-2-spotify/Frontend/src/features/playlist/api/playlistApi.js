import { findPlaylistById, findTrackById, mockPlaylists } from '../../../shared/utils/mockData.js'
import { wait } from '../../../shared/utils/mockAsync.js'

export const getPlaylistById = async (playlistId) => {
    const playlist = findPlaylistById(playlistId) ?? mockPlaylists[ 0 ]

    return wait({
        ...playlist,
        tracks: playlist.tracks
            .map((trackId, index) => {
                const track = findTrackById(trackId)

                if (!track) {
                    return null
                }

                return {
                    ...track,
                    trackNumber: index + 1,
                }
            })
            .filter(Boolean),
    })
}