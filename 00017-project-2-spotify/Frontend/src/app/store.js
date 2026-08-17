import { configureStore } from '@reduxjs/toolkit'
import { homeReducer } from '../features/home/state/homeSlice.js'
import { libraryReducer } from '../features/library/state/librarySlice.js'
import { playerReducer } from '../features/player/state/playerSlice.js'
import { playlistReducer } from '../features/playlist/state/playlistSlice.js'
import { userReducer } from '../features/user/state/userSlice.js'

export const store = configureStore({
    reducer: {
        home: homeReducer,
        library: libraryReducer,
        player: playerReducer,
        playlist: playlistReducer,
        user: userReducer,
    },
})