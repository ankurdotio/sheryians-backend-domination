import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { mockTracks } from '../../../shared/utils/mockData.js'
import { getInitialQueue } from '../api/playerApi.js'

export const hydratePlayer = createAsyncThunk('player/hydrate', async () => getInitialQueue())

const initialState = {
    queue: mockTracks,
    currentTrackIndex: 0,
    isPlaying: false,
    progress: 18,
    volume: 74,
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        togglePlay(state) {
            state.isPlaying = !state.isPlaying
        },
        play(state) {
            state.isPlaying = true
        },
        pause(state) {
            state.isPlaying = false
        },
        nextTrack(state) {
            state.currentTrackIndex = (state.currentTrackIndex + 1) % state.queue.length
            state.progress = 0
            state.isPlaying = true
        },
        previousTrack(state) {
            state.currentTrackIndex =
                (state.currentTrackIndex - 1 + state.queue.length) % state.queue.length
            state.progress = 0
            state.isPlaying = true
        },
        setProgress(state, action) {
            state.progress = action.payload
        },
        setVolume(state, action) {
            state.volume = action.payload
        },
        playTrack(state, action) {
            const track = action.payload
            const existingIndex = state.queue.findIndex((item) => item.id === track.id)

            if (existingIndex === -1) {
                state.queue.push(track)
                state.currentTrackIndex = state.queue.length - 1
            } else {
                state.currentTrackIndex = existingIndex
            }

            state.progress = 0
            state.isPlaying = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(hydratePlayer.fulfilled, (state, action) => {
            state.queue = action.payload.queue
            state.currentTrackIndex = state.queue.findIndex(
                (track) => track.id === action.payload.currentTrackId,
            )
        })
    },
})

export const {
    togglePlay,
    play,
    pause,
    nextTrack,
    previousTrack,
    setProgress,
    setVolume,
    playTrack,
} = playerSlice.actions
export const playerReducer = playerSlice.reducer
export const selectCurrentTrack = (state) =>
    state.player.queue[ state.player.currentTrackIndex ] ?? mockTracks[ 0 ]