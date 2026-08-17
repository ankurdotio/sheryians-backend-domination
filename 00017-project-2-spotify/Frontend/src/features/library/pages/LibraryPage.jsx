import LibraryFilters from '../components/LibraryFilters.jsx'
import LibraryGrid from '../components/LibraryGrid.jsx'
import { useLibraryData } from '../hooks/useLibraryData.js'

function LibraryPage() {
  const { playlists, total, viewMode, setViewMode } = useLibraryData()

  return (
    <div className="space-y-6 pb-8">
      <LibraryFilters onViewModeChange={setViewMode} total={total} viewMode={viewMode} />
      <LibraryGrid playlists={playlists} viewMode={viewMode} />
    </div>
  )
}

export default LibraryPage