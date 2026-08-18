import { mockHomeShelves } from '../../../shared/utils/mockData.js'
import { wait } from '../../../shared/utils/mockAsync.js'
import { api } from '../../../shared/api/httpClient.js'

export const getHomeData = async () => {

    const response = await api.get("/songs?n=4")

    const songs = response.data.data.songs.map(song => {
        return {
            id: song._id,
            title: song.title,
            artist: song.artist,
            album: song.album,
            url: song.url,
            poster: song.poster,
        }
    })

    const albumsResponse = await api.get("/songs/album?n=4")

    const albums = albumsResponse.data.data.albums.map(album => {
        return {
            id: album._id,
            title: album.title,
            artist: album.artist,
            poster: album.poster,
        }
    })


    return {
        greeting: 'Good evening',
        subtitle: 'Jump back into your mock listening queue.',
        songs: songs,
        albums: albums,
    }
}