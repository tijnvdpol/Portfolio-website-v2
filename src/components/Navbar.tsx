import { NavLink } from 'react-router-dom'

const focusRing =
  'rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 text-sm font-medium transition-colors ${focusRing} after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform ${
    isActive
      ? 'text-ink after:scale-x-100'
      : 'text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100'
  }`

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <NavLink
          to="/"
          className={`flex items-center gap-2.5 text-ink ${focusRing}`}
          aria-label="Tijn van der Pol — home"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-md bg-ink font-display text-base font-semibold text-paper"
          >
            T
          </span>
          <span className="font-display text-base font-medium tracking-tight sm:text-lg">Tijn van der Pol</span>
        </NavLink>
        <div className="flex items-center gap-4 sm:gap-7">
          <NavLink to="/" end className={(state) => `hidden sm:inline ${linkClass(state)}`}>
            Home
          </NavLink>
          <NavLink to="/projecten" className={linkClass}>
            Projecten
          </NavLink>
          <NavLink to="/over-mij" className={linkClass}>
            Over mij
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
