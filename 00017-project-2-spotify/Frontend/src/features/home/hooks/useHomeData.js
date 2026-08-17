import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeData } from '../api/homeApi.js'
import { setActiveShelf } from '../state/homeSlice.js'

export const useHomeData = () => {
    const dispatch = useDispatch()
    const activeShelf = useSelector((state) => state.home.activeShelf)
    const [ homeData, setHomeData ] = useState(null)

    useEffect(() => {
        let isMounted = true

        getHomeData().then((data) => {
            if (isMounted) {
                setHomeData(data)
            }
        })

        return () => {
            isMounted = false
        }
    }, [])

    return {
        homeData,
        activeShelf,
        setActiveShelf: (shelf) => dispatch(setActiveShelf(shelf)),
    }
}