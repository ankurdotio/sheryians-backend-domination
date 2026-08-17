import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeShelf: 'recentlyPlayed',
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setActiveShelf(state, action) {
            state.activeShelf = action.payload
        },
    },
})

export const { setActiveShelf } = homeSlice.actions
export const homeReducer = homeSlice.reducer