import { Navigate } from 'react-router'

function NotFoundPage() {
  return (
    <div className="flex min-h-[50svh] flex-col items-center justify-center gap-4 rounded-[28px] border border-white/10 bg-white/5 px-6 text-center text-white/70 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">404</p>
      <h1 className="text-3xl font-semibold text-white">Page not found</h1>
      <Navigate replace to="/" />
    </div>
  )
}

export default NotFoundPage