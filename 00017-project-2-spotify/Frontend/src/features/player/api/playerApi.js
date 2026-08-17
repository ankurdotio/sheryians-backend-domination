import { mockTracks } from '../../../shared/utils/mockData.js'
import { wait } from '../../../shared/utils/mockAsync.js'

export const getInitialQueue = async () =>
    wait({
        queue: mockTracks,
        currentTrackId: mockTracks[ 0 ].id,
    })