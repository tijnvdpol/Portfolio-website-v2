import { Link, NavLink } from 'react-router-dom'
import { home } from '../../data/home'
import { lastChanged } from '../../lib/format'
import { focusRing } from '../../lib/styles'

// Elk item is een pagina (Home, Audit trail, Dossiers, Over mij) en licht op zolang je op die pagina
// of eronder zit, in de volgorde waarin de knoppen op de homepage staan. Contact is de voetregel,
// die op elke pagina staat en dus lokaal blijft.
export function SectionNav({ className = '' }: { className?: string }) {
  return (
    <nav aria-label="Secties" className={className}>
      {home.nav.map((item) => {
        const content = (
          <>
            <span className="hidden font-mono text-xs text-muted lg:inline">{item.number}</span>
            <span>{item.label}</span>
          </>
        )
        const itemClass = `flex shrink-0 items-baseline gap-2 text-sm link-double sm:text-[15px] ${focusRing}`
        if (item.href.startsWith('#')) {
          return (
            <a key={item.href} href={item.href} className={itemClass}>
              {content}
            </a>
          )
        }
        return (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              `${itemClass} ${isActive ? 'font-semibold underline decoration-double decoration-[1.5px] underline-offset-[5px]' : ''}`
            }
          >
            {content}
          </NavLink>
        )
      })}
    </nav>
  )
}

// Paraaf-logo, naam, navigatie en dossierdatum in één balk. Op smalle schermen staat de navigatie
// op een tweede regel binnen dezelfde balk.
export default function DossierHeader() {
  return (
    <header className="flex min-h-14 flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-ink px-4 py-2 sm:min-h-[72px] md:px-10 xl:px-20">
      <Link
        to="/"
        aria-label="Tijn van der Pol, naar de top van de homepage"
        className={`flex items-center gap-4 ${focusRing}`}
      >
        <span
          aria-hidden="true"
          className="inline-block translate-y-1.5 -rotate-4 pr-1 font-sign text-[38px] leading-none sm:text-[44px]"
        >
          TvdP
        </span>
        <span aria-hidden="true" className="h-7 w-px bg-rule-strong" />
        <span className="text-[15px] font-bold sm:text-[17px]">Tijn van der Pol</span>
      </Link>

      <SectionNav className="order-last flex w-full flex-wrap gap-x-5 gap-y-1 md:order-none md:w-auto md:gap-x-6 xl:gap-9" />

      <p className="hidden font-mono text-xs tracking-[0.04em] text-muted xl:block">
        DOSSIER 2026 · GEWIJZIGD {lastChanged()}
      </p>
    </header>
  )
}
