import { api } from '../../../shared/api/httpClient.js'

function normalizeAxiosError(error) {
    const message = error.response?.data?.message ?? error.message ?? 'Request failed.'
    const normalizedError = new Error(message)
    normalizedError.status = error.response?.status
    return normalizedError
}

export async function loginUser(payload) {
    try {
        const { data } = await api.post('/auth/login', payload, {
            skipAuthRefresh: true,
        })
        return data
    } catch (error) {
        throw normalizeAxiosError(error)
    }
}

export async function registerUser(payload) {
    try {
        const { data } = await api.post('/auth/register', payload, {
            skipAuthRefresh: true,
        })
        return data
    } catch (error) {
        throw normalizeAxiosError(error)
    }
}

export async function fetchCurrentUser() {
    try {
        const { data } = await api.get('/auth/me')
        return data
    } catch (error) {
        throw normalizeAxiosError(error)
    }
}

export async function refreshAuthSession() {
    try {
        const { data } = await api.post('/auth/refresh', null, {
            skipAuthRefresh: true,
        })
        return data
    } catch (error) {
        throw normalizeAxiosError(error)
    }
}

export async function logoutUser() {
    try {
        await api.post('/auth/logout', null, {
            skipAuthRefresh: true,
        })
    } catch (error) {
        throw normalizeAxiosError(error)
    }
}