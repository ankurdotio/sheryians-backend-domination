import { useState } from 'react'

function AuthModal({ isOpen, onClose, onLogin, onRegister, status, error }) {
  const [mode, setMode] = useState('login')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'user',
  })

  if (!isOpen) {
    return null
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (mode === 'login') {
      await onLogin({ email: formState.email, password: formState.password })
      return
    }

    await onRegister({
      name: formState.name,
      email: formState.email,
      password: formState.password,
      userType: formState.userType,
    })
  }

  const isLoading = status === 'loading'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-emerald-400/80">Spotify Auth</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </h2>
          </div>
          <button className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="mt-5 flex rounded-full border border-white/10 bg-white/5 p-1">
          <button
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === 'login' ? 'bg-emerald-400 text-zinc-950' : 'text-white/60 hover:text-white'}`}
            onClick={() => setMode('login')}
            type="button"
          >
            Login
          </button>
          <button
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === 'register' ? 'bg-emerald-400 text-zinc-950' : 'text-white/60 hover:text-white'}`}
            onClick={() => setMode('register')}
            type="button"
          >
            Register
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' ? (
            <label className="block space-y-2">
              <span className="text-sm text-white/60">Name</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-400"
                name="name"
                onChange={handleChange}
                placeholder="Your name"
                value={formState.name}
              />
            </label>
          ) : null}

          <label className="block space-y-2">
            <span className="text-sm text-white/60">Email</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-400"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              value={formState.email}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-white/60">Password</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-400"
              name="password"
              onChange={handleChange}
              placeholder="••••••••"
              type="password"
              value={formState.password}
            />
          </label>

          {mode === 'register' ? (
            <label className="block space-y-2">
              <span className="text-sm text-white/60">Account type</span>
              <select
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                name="userType"
                onChange={handleChange}
                value={formState.userType}
              >
                <option className="bg-zinc-950" value="user">
                  Listener
                </option>
                <option className="bg-zinc-950" value="artist">
                  Artist
                </option>
              </select>
            </label>
          ) : null}

          {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

          <button
            className="w-full rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthModal