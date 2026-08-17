import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    clearAuth,
    markAuthHydrated,
    setAccessToken,
    setAuthError,
    setAuthPending,
    setAuthSuccess,
} from '../state/userSlice.js'
import {
    fetchCurrentUser,
    loginUser,
    logoutUser,
    refreshAuthSession,
    registerUser,
} from '../api/userApi.js'

let bootstrapPromise = null

async function bootstrapAuth(dispatch, isHydrated) {
    if (isHydrated) {
        return
    }

    if (!bootstrapPromise) {
        bootstrapPromise = (async () => {
            dispatch(setAuthPending())

            try {
                const refreshResponse = await refreshAuthSession()
                dispatch(setAccessToken(refreshResponse.accessToken ?? null))
                const current = await fetchCurrentUser()
                dispatch(
                    setAuthSuccess({
                        user: current.user,
                        accessToken: refreshResponse.accessToken ?? null,
                    }),
                )
            } catch (error) {
                dispatch(clearAuth())
                if (error?.status !== 401) {
                    dispatch(setAuthError(error?.message ?? 'Authentication failed.'))
                } else {
                    dispatch(markAuthHydrated())
                }
            } finally {
                bootstrapPromise = null
            }
        })()
    }

    await bootstrapPromise
}

export const useUser = () => {
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.user)

    useEffect(() => {
        void bootstrapAuth(dispatch, userState.isHydrated)
    }, [ dispatch, userState.isHydrated ])

    const login = useCallback(
        async (payload) => {
            dispatch(setAuthPending())

            try {
                const response = await loginUser(payload)
                dispatch(
                    setAuthSuccess({
                        user: response.user,
                        accessToken: response.accessToken,
                    }),
                )
                return response
            } catch (error) {
                dispatch(setAuthError(error?.message ?? 'Login failed.'))
                throw error
            }
        },
        [ dispatch ],
    )

    const register = useCallback(
        async (payload) => {
            dispatch(setAuthPending())

            try {
                const response = await registerUser(payload)
                dispatch(
                    setAuthSuccess({
                        user: response.user,
                        accessToken: response.accessToken,
                    }),
                )
                return response
            } catch (error) {
                dispatch(setAuthError(error?.message ?? 'Registration failed.'))
                throw error
            }
        },
        [ dispatch ],
    )

    const logout = useCallback(async () => {
        dispatch(setAuthPending())

        try {
            await logoutUser()
            dispatch(clearAuth())
        } catch (error) {
            dispatch(setAuthError(error?.message ?? 'Logout failed.'))
            throw error
        }
    }, [ dispatch ])

    return {
        user: userState.currentUser,
        accessToken: userState.accessToken,
        isAuthenticated: userState.isAuthenticated,
        status: userState.status,
        error: userState.error,
        isHydrated: userState.isHydrated,
        login,
        register,
        logout,
    }
}