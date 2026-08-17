import { findAlbumById, findTrackById } from '../../../shared/utils/mockData.js'
import { wait } from '../../../shared/utils/mockAsync.js'

export const getAlbumById = async (albumId) => {
    const album = findAlbumById(albumId)

    if (!album) {
        return wait(null)
    }

    return wait({
        ...album,
        tracks: album.trackIds
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
