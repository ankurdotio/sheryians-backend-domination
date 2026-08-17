import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedPlaylistId: 'morning-boost',
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setSelectedPlaylistId(state, action) {
            state.selectedPlaylistId = action.payload
        },
    },
})

export const { setSelectedPlaylistId } = playlistSlice.actions
export const playlistReducer = playlistSlice.reducer