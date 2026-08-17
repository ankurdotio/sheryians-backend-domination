export const formatDuration = (seconds) => {
    const safeSeconds = Number(seconds) || 0
    const minutes = Math.floor(safeSeconds / 60)
    const remainder = String(safeSeconds % 60).padStart(2, '0')

    return `${minutes}:${remainder}`
}

export const formatNumber = (value) => {
    if (value === null || value === undefined) {
        return '0'
    }

    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)
}