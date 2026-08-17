import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLibraryPlaylists } from '../api/libraryApi.js'
import { setViewMode } from '../state/librarySlice.js'

export const useLibraryData = () => {
    const dispatch = useDispatch()
    const viewMode = useSelector((state) => state.library.viewMode)
    const [ libraryData, setLibraryData ] = useState({ playlists: [], total: 0 })

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

    return {
        playlists: libraryData.playlists,
        total: libraryData.total,
        viewMode,
        setViewMode: (mode) => dispatch(setViewMode(mode)),
    }
}