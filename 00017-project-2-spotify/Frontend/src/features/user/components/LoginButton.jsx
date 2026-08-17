function LoginButton({ isAuthenticated, onOpenAuth, status }) {
  if (isAuthenticated) {
    return null
  }

  return (
    <button
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
      disabled={status === 'loading'}
      onClick={onOpenAuth}
      type="button"
    >
      Login
    </button>
  )
}

export default LoginButton