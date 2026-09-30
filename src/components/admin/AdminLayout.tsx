import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { signOut } from '../../lib/auth'
import { focusRing } from '../../lib/styles'

const navLink = ({ isActive }: { isActive: boolean }) =>
  `text-[15px] link-double ${focusRing} ${isActive ? 'font-semibold underline decoration-double decoration-[1.5px] underline-offset-[5px]' : ''}`

// Layout van de beheeromgeving: dezelfde header als de publieke site, met beheerlinks.
export default function AdminLayout() {
  const { session } = useAuth()

  return (
    <div className="min-h-screen bg-paper font-head text-ink">
      <header className="flex min-h-14 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-ink px-4 py-2 sm:min-h-[72px] md:px-10 xl:px-20">
        <Link to="/admin" aria-label="Beheer, naar het overzicht" className={`flex items-center gap-4 ${focusRing}`}>
          <span
            aria-hidden="true"
            className="inline-block translate-y-1.5 -rotate-4 pr-1 font-sign text-[38px] leading-none sm:text-[44px]"
          >
            TvdP
          </span>
          <span aria-hidden="true" className="h-7 w-px bg-rule-strong" />
          <span className="label-mono text-[13px]">Beheer</span>
        </Link>

        {session ? (
          <nav aria-label="Beheer" className="flex flex-wrap items-baseline gap-x-7 gap-y-1">
            <NavLink to="/admin" end className={navLink}>
              Overzicht
            </NavLink>
            <NavLink to="/admin/projecten/nieuw" className={navLink}>
              Nieuw project
            </NavLink>
            <Link to="/" className={`text-[15px] link-double ${focusRing}`}>
              Site bekijken ↗
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className={`text-[15px] font-semibold link-double ${focusRing}`}
            >
              Uitloggen
            </button>
          </nav>
        ) : null}
      </header>
      <Outlet />
    </div>
  )
}
