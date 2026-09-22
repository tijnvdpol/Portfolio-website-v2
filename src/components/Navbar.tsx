import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
  }`

export default function Navbar() {
  return (
    <header className="border-b border-slate-200">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="text-base font-semibold text-slate-900">
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
