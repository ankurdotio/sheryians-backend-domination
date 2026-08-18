import { api } from "../../../shared/api/httpClient.js"

export const getPlaylistById = async (playlistId) => {

    const playlistDetailedResponse = await api.get(`/songs/playlist/${playlistId}`)

    const playlistDetailed = playlistDetailedResponse.data.data.playlist

    return {
        // ...playlist,
        // tracks: playlist.tracks
        //     .map((trackId, index) => {
        //         const track = findTrackById(trackId)

        //         if (!track) {
        //             return null
        //         }

        //         return {
        //             ...track,
        //             trackNumber: index + 1,
        //         }
        //     })
        //     .filter(Boolean),
        id: playlistDetailed._id,
        title: playlistDetailed.title,
        savedAt: new Date(playlistDetailed.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }),
        tracks: playlistDetailed.songs.map((song) => {
            return {
                id: song._id,
                title: song.title,
                artist: song.artist.name,
                album: song.album.title,
                duration: song.duration,
                poster: song.poster,
                url: song.url,
            }
        }),
        type: 'Playlist',
        coverClass: "from-emerald-500 via-teal-400 to-cyan-500",
    }
}