import Albums from '../components/Albums.jsx'
import Songs from '../components/Songs.jsx'
import { useHomeData } from '../hooks/useHomeData.js'

function HomePage() {
    const { homeData } = useHomeData()

    if (!homeData) {
        return (
            <div className="grid min-h-[50svh] place-items-center rounded-[28px] border border-white/10 bg-white/5 text-white/50 shadow-2xl shadow-black/30 backdrop-blur-xl">
                Loading home feed...
            </div>
        )
    }

    return (
        <div className="space-y-8 pb-8">
            <Songs items={homeData.songs} />
            <Albums items={homeData.albums} />
        </div>
    )
}

export default HomePage