import { useEffect, useState } from 'react'
import { getAlbumById } from '../api/albumApi.js'

export const useAlbumData = (albumId) => {
    const [ album, setAlbum ] = useState(null)

    useEffect(() => {
        let isMounted = true
        setAlbum(null)

        getAlbumById(albumId).then((data) => {
            if (isMounted) {
                setAlbum(data)
            }
        })

        return () => {
            isMounted = false
        }
    }, [ albumId ])

    return {
        album,
    }
}
