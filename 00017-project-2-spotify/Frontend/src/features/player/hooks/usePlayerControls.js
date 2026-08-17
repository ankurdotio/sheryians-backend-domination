import { useDispatch, useSelector } from 'react-redux'
import {
    nextTrack,
    playTrack,
    previousTrack,
    selectCurrentTrack,
    setProgress,
    setVolume,
    togglePlay,
} from '../state/playerSlice.js'

export const usePlayerControls = () => {
    const dispatch = useDispatch()
    const currentTrack = useSelector(selectCurrentTrack)
    const isPlaying = useSelector((state) => state.player.isPlaying)
    const progress = useSelector((state) => state.player.progress)
    const volume = useSelector((state) => state.player.volume)

    return {
        currentTrack,
        isPlaying,
        progress,
        volume,
        togglePlay: () => dispatch(togglePlay()),
        nextTrack: () => dispatch(nextTrack()),
        previousTrack: () => dispatch(previousTrack()),
        setProgress: (value) => dispatch(setProgress(value)),
        setVolume: (value) => dispatch(setVolume(value)),
        playTrack: (track) => dispatch(playTrack(track)),
    }
}