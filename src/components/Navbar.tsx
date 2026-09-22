import { NavLink } from 'react-router-dom'

const focusRing =
  'rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${focusRing} ${
    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
  }`

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <NavLink to="/" className={`text-base font-semibold text-slate-900 ${focusRing}`}>
          Tijn van der Pol
        </NavLink>
        <div className="flex gap-6">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/projecten" className={linkClass}>
            Projecten
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
