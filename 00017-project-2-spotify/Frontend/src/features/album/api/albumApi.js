import { api } from '../../../shared/api/httpClient.js'

export const getAlbumById = async (albumId) => {
    const albumResponse = await api.get(`/songs/album/${albumId}`)

    const album = {
        id: albumResponse.data.data.album._id,
        title: albumResponse.data.data.album.title,
        poster: albumResponse.data.data.album.poster,
        artist: albumResponse.data.data.album.artist,
        tracks: albumResponse.data.data.album.tracks,
    }

    return {
        ...album,
        tracks: album.tracks
            .map((track, index) => {
                return {
                    ...track,
                    trackNumber: index + 1,
                }
            })
            .filter(Boolean),
    }
}
