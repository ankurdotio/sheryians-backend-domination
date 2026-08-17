import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaylistById } from '../api/playlistApi.js'
import { setSelectedPlaylistId } from '../state/playlistSlice.js'

export const usePlaylistData = (playlistId) => {
    const dispatch = useDispatch()
    const selectedPlaylistId = useSelector((state) => state.playlist.selectedPlaylistId)
    const [ playlist, setPlaylist ] = useState(null)

    useEffect(() => {
        let isMounted = true

        if (playlistId) {
            dispatch(setSelectedPlaylistId(playlistId))
        }

        getPlaylistById(playlistId ?? selectedPlaylistId).then((data) => {
            if (isMounted) {
                setPlaylist(data)
            }
        })

        return () => {
            isMounted = false
        }
    }, [ dispatch, playlistId, selectedPlaylistId ])

    return {
        playlist,
    }
}