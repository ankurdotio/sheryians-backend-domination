import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    accessToken: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
    isHydrated: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthPending(state) {
            state.status = 'loading'
            state.error = null
        },
        setAuthSuccess(state, action) {
            state.currentUser = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
            state.status = 'succeeded'
            state.error = null
            state.isHydrated = true
        },
        setAuthError(state, action) {
            state.status = 'failed'
            state.error = action.payload
            state.isHydrated = true
        },
        setAccessToken(state, action) {
            state.accessToken = action.payload ?? null
        },
        markAuthHydrated(state) {
            state.isHydrated = true
        },
        clearAuth(state) {
            state.currentUser = null
            state.accessToken = null
            state.isAuthenticated = false
            state.status = 'idle'
            state.error = null
            state.isHydrated = true
        },
    },
})

export const {
    setAuthPending,
    setAuthSuccess,
    setAuthError,
    setAccessToken,
    markAuthHydrated,
    clearAuth,
} = userSlice.actions

export const userReducer = userSlice.reducer