import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPlaylist as createPlaylistRequest, getLibraryPlaylists } from '../api/libraryApi.js'
import { setViewMode } from '../state/librarySlice.js'

export const useLibraryData = () => {
    const dispatch = useDispatch()
    const viewMode = useSelector((state) => state.library.viewMode)
    const [ libraryData, setLibraryData ] = useState({ playlists: [], total: 0 })
    const [ createStatus, setCreateStatus ] = useState('idle')
    const [ createError, setCreateError ] = useState(null)

    useEffect(() => {
        let isMounted = true

        getLibraryPlaylists().then((data) => {
            if (isMounted) {
                setLibraryData(data)
            }
        })

        return () => {
            isMounted = false
        }
    }, [])

    const createPlaylist = useCallback(async (title) => {
        setCreateStatus('loading')
        setCreateError(null)

        try {
            const { playlist } = await createPlaylistRequest({ title })

            setLibraryData((current) => ({
                playlists: [ playlist, ...current.playlists ],
                total: current.total + 1,
            }))
            setCreateStatus('succeeded')

            return playlist
        } catch (requestError) {
            setCreateStatus('failed')
            setCreateError(requestError.message ?? 'Unable to create playlist')
            throw requestError
        }
    }, [])

    return {
        playlists: libraryData.playlists,
        total: libraryData.total,
        viewMode,
        setViewMode: (mode) => dispatch(setViewMode(mode)),
        createPlaylist,
        createStatus,
        createError,
    }
}