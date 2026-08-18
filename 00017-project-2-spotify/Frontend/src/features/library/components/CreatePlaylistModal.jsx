import { useState } from 'react'

function CreatePlaylistModal({ isOpen, onClose, onCreate, status, error }) {
  const [title, setTitle] = useState('')

  if (!isOpen) {
    return null
  }

  const isLoading = status === 'loading'

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title.trim() || isLoading) {
      return
    }

    await onCreate(title.trim())
    setTitle('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-emerald-400/80">Playlist</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Create playlist</h2>
          </div>
          <button
            className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm text-white/60">Title</span>
            <input
              autoFocus
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-400"
              name="title"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="My playlist"
              value={title}
            />
          </label>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            className="w-full rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!title.trim() || isLoading}
            type="submit"
          >
            {isLoading ? 'Creating…' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePlaylistModal
