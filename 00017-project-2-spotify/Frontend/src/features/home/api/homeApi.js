import { mockHomeShelves } from '../../../shared/utils/mockData.js'
import { wait } from '../../../shared/utils/mockAsync.js'

export const getHomeData = async () =>
    wait({
        greeting: 'Good evening',
        subtitle: 'Jump back into your mock listening queue.',
        ...mockHomeShelves,
    })