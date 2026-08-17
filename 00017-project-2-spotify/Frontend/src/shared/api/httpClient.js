import axios from 'axios'
import { store } from '../../app/store.js'
import { clearAuth, setAccessToken } from '../../features/user/state/userSlice.js'

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
})

let isRefreshing = false
let refreshQueue = []

function flushRefreshQueue(error, nextToken = null) {
    refreshQueue.forEach((queueItem) => {
        if (error) {
            queueItem.reject(error)
            return
        }
        queueItem.resolve(nextToken)
    })

    refreshQueue = []
}

api.interceptors.request.use((config) => {
    const token = store.getState().user.accessToken

    if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        const status = error.response?.status

        if (!originalRequest || status !== 401) {
            return Promise.reject(error)
        }

        if (originalRequest.skipAuthRefresh || originalRequest.url?.includes('/auth/refresh')) {
            return Promise.reject(error)
        }

        if (originalRequest._retry) {
            return Promise.reject(error)
        }

        originalRequest._retry = true

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push({ resolve, reject })
            }).then((nextToken) => {
                if (nextToken) {
                    originalRequest.headers = originalRequest.headers ?? {}
                    originalRequest.headers.Authorization = `Bearer ${nextToken}`
                }

                return api(originalRequest)
            })
        }

        isRefreshing = true

        try {
            const refreshResponse = await api.post('/auth/refresh', null, {
                skipAuthRefresh: true,
            })

            const nextToken = refreshResponse.data?.accessToken ?? null
            store.dispatch(setAccessToken(nextToken))

            flushRefreshQueue(null, nextToken)

            if (nextToken) {
                originalRequest.headers = originalRequest.headers ?? {}
                originalRequest.headers.Authorization = `Bearer ${nextToken}`
            }

            return api(originalRequest)
        } catch (refreshError) {
            flushRefreshQueue(refreshError, null)
            store.dispatch(clearAuth())
            return Promise.reject(refreshError)
        } finally {
            isRefreshing = false
        }
    },
)

export { api }