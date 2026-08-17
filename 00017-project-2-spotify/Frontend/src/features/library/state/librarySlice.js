import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    viewMode: 'grid',
}

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        setViewMode(state, action) {
            state.viewMode = action.payload
        },
    },
})

export const { setViewMode } = librarySlice.actions
export const libraryReducer = librarySlice.reducer