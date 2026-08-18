export const mockUser = {
    id: 'guest-user',
    name: 'Guest Listener',
    email: 'guest@spotify-clone.local',
    avatar: 'GL',
    isAuthenticated: false,
}

export const authenticatedUser = {
    id: 'user-01',
    name: 'Aria Stone',
    email: 'aria@spotify-clone.local',
    avatar: 'AS',
    isAuthenticated: true,
}

export const mockArtists = [
    {
        id: 'artist-1',
        name: 'Nova Lane',
        genre: 'Alt Pop',
        followers: 1240000,
        coverClass: 'from-fuchsia-500 via-rose-500 to-orange-400',
    },
    {
        id: 'artist-2',
        name: 'Luma Drive',
        genre: 'Synthwave',
        followers: 860000,
        coverClass: 'from-cyan-500 via-sky-500 to-indigo-500',
    },
    {
        id: 'artist-3',
        name: 'Moss Harbor',
        genre: 'Indie Folk',
        followers: 412000,
        coverClass: 'from-emerald-500 via-lime-400 to-teal-500',
    },
    {
        id: 'artist-4',
        name: 'Paper Satellites',
        genre: 'Dream Pop',
        followers: 980000,
        coverClass: 'from-violet-500 via-purple-500 to-pink-500',
    },
]

export const mockTracks = [
    {
        id: 'track-1',
        title: 'Midnight Drive',
        artist: 'Nova Lane',
        album: 'City After Dark',
        duration: 214,
        genre: 'Pop',
        plays: 2400000,
        coverClass: 'from-fuchsia-500 via-pink-500 to-orange-400',
    },
    {
        id: 'track-2',
        title: 'Blue Hour',
        artist: 'Luma Drive',
        album: 'Neon Quiet',
        duration: 196,
        genre: 'Electronic',
        plays: 1980000,
        coverClass: 'from-cyan-500 via-sky-500 to-indigo-500',
    },
    {
        id: 'track-3',
        title: 'Velvet Skyline',
        artist: 'Paper Satellites',
        album: 'Soft Orbit',
        duration: 228,
        genre: 'Dream Pop',
        plays: 1150000,
        coverClass: 'from-violet-500 via-purple-500 to-pink-500',
    },
    {
        id: 'track-4',
        title: 'Morning Static',
        artist: 'Moss Harbor',
        album: 'Signal Bloom',
        duration: 173,
        genre: 'Indie',
        plays: 860000,
        coverClass: 'from-emerald-500 via-lime-400 to-teal-500',
    },
    {
        id: 'track-5',
        title: 'Golden Hour',
        artist: 'Aria Stone',
        album: 'Open Windows',
        duration: 241,
        genre: 'Chill',
        plays: 1750000,
        coverClass: 'from-amber-400 via-orange-400 to-rose-500',
    },
    {
        id: 'track-6',
        title: 'Late Train',
        artist: 'Nova Lane',
        album: 'City After Dark',
        duration: 205,
        genre: 'Pop',
        plays: 1010000,
        coverClass: 'from-slate-500 via-zinc-600 to-slate-900',
    },
    {
        id: 'track-7',
        title: 'Soft Landing',
        artist: 'Moss Harbor',
        album: 'Signal Bloom',
        duration: 188,
        genre: 'Folk',
        plays: 770000,
        coverClass: 'from-emerald-400 via-teal-400 to-cyan-400',
    },
    {
        id: 'track-8',
        title: 'Afterglow Loop',
        artist: 'Paper Satellites',
        album: 'Soft Orbit',
        duration: 233,
        genre: 'Dream Pop',
        plays: 940000,
        coverClass: 'from-pink-500 via-fuchsia-500 to-violet-500',
    },
]

export const mockPlaylists = [
    {
        id: 'morning-boost',
        title: 'Morning Boost',
        description: 'Bright tracks to get momentum started without the noise.',
        owner: 'Spotify',
        followers: 245000,
        tracks: [ 'track-5', 'track-4', 'track-7' ],
        coverClass: 'from-emerald-500 via-lime-400 to-teal-600',
        type: 'Workout',
    },
    {
        id: 'deep-focus',
        title: 'Deep Focus',
        description: 'Instrumental and low-friction songs for long stretches of work.',
        owner: 'Editorial',
        followers: 318000,
        tracks: [ 'track-2', 'track-6', 'track-8' ],
        coverClass: 'from-sky-500 via-cyan-500 to-blue-600',
        type: 'Focus',
    },
    {
        id: 'retro-wave',
        title: 'Retro Wave',
        description: 'Glossy synths, bright drums, and a cinematic night drive vibe.',
        owner: 'Neon Club',
        followers: 882000,
        tracks: [ 'track-2', 'track-3', 'track-1' ],
        coverClass: 'from-fuchsia-500 via-purple-500 to-indigo-500',
        type: 'Party',
    },
    {
        id: 'soft-orbit',
        title: 'Soft Orbit',
        description: 'Warm playlists with a floating edge and deep late-evening feel.',
        owner: 'Editorial',
        followers: 411000,
        tracks: [ 'track-3', 'track-8', 'track-7' ],
        coverClass: 'from-violet-500 via-pink-500 to-rose-500',
        type: 'Chill',
    },
    {
        id: 'city-after-dark',
        title: 'City After Dark',
        description: 'Sharp pop hooks and skyline energy for the ride home.',
        owner: 'Urban Session',
        followers: 522000,
        tracks: [ 'track-1', 'track-6', 'track-5' ],
        coverClass: 'from-orange-500 via-rose-500 to-red-500',
        type: 'Trending',
    },
    {
        id: 'signal-bloom',
        title: 'Signal Bloom',
        description: 'Gentle production, wide melodies, and a clean listening lane.',
        owner: 'Indie Radar',
        followers: 266000,
        tracks: [ 'track-4', 'track-7', 'track-8' ],
        coverClass: 'from-lime-500 via-emerald-500 to-cyan-500',
        type: 'Indie',
    },
]

export const mockLibraryPlaylists = [
    {
        ...mockPlaylists[ 0 ],
        savedAt: 'Saved today',
    },
    {
        ...mockPlaylists[ 2 ],
        savedAt: 'Saved 2 days ago',
    },
    {
        ...mockPlaylists[ 3 ],
        savedAt: 'Saved last week',
    },
    {
        ...mockPlaylists[ 5 ],
        savedAt: 'Saved last month',
    },
]

export const mockAlbums = Array.from(
    mockTracks
        .reduce((albumsByTitle, track) => {
            if (!albumsByTitle.has(track.album)) {
                albumsByTitle.set(track.album, {
                    id: track.album.toLowerCase().replace(/\s+/g, '-'),
                    title: track.album,
                    artist: track.artist,
                    coverClass: track.coverClass,
                    firstTrackId: track.id,
                    trackIds: [],
                    trackCount: 0,
                })
            }

            const album = albumsByTitle.get(track.album)
            album.trackIds.push(track.id)
            album.trackCount += 1
            return albumsByTitle
        }, new Map())
        .values(),
)

export const mockHomeShelves = {
    recentlyPlayed: [ mockTracks[ 0 ], mockTracks[ 1 ], mockTracks[ 4 ], mockTracks[ 5 ] ],
    albums: mockAlbums,
}

export const findPlaylistById = (playlistId) =>
    mockPlaylists.find((playlist) => playlist.id === playlistId)

export const findTrackById = (trackId) =>
    mockTracks.find((track) => track.id === trackId)

export const findAlbumById = (albumId) =>
    mockAlbums.find((album) => album.id === albumId)

// UI-only: mutates the in-memory mock playlist so the change is visible while the app stays open.
export const addTrackToPlaylist = (playlistId, trackId) => {
    const playlist = mockPlaylists.find((item) => item.id === playlistId)

    if (!playlist || playlist.tracks.includes(trackId)) {
        return false
    }

    playlist.tracks.push(trackId)
    return true
}

const newPlaylistCoverClasses = [
    'from-emerald-500 via-teal-400 to-cyan-500',
    'from-fuchsia-500 via-rose-500 to-orange-400',
    'from-sky-500 via-indigo-500 to-violet-600',
    'from-amber-400 via-orange-500 to-rose-500',
]

// UI-only: mutates the in-memory mocks so a created playlist shows up while the app stays open.
export const createPlaylist = (title) => {
    const cleanTitle = title.trim()
    const playlist = {
        id: `playlist-${Date.now()}`,
        title: cleanTitle,
        description: 'Playlist created from the sidebar.',
        owner: 'You',
        followers: 0,
        tracks: [],
        coverClass: newPlaylistCoverClasses[ mockPlaylists.length % newPlaylistCoverClasses.length ],
        type: 'Playlist',
    }

    mockPlaylists.push(playlist)
    mockLibraryPlaylists.unshift({ ...playlist, savedAt: 'Saved just now' })

    return playlist
}