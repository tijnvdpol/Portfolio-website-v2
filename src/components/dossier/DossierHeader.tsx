import { Link } from 'react-router-dom'
import { home } from '../../data/home'
import { lastChanged } from '../../lib/format'
import { focusRing } from '../../lib/styles'

export function SectionNav({ className = '' }: { className?: string }) {
  return (
    <nav aria-label="Secties" className={className}>
      {home.nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`flex shrink-0 items-baseline gap-2 text-[15px] link-double ${focusRing}`}
        >
          <span className="font-mono text-xs text-muted">{item.number}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

// Paraaf-logo, naam, sectienavigatie en dossierdatum. Op kleine schermen staat de
// navigatie in een aparte rij onder de sticky balk (zie DossierLayout).
export default function DossierHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-6 border-b border-ink px-4 sm:h-[72px] md:px-10 xl:px-20">
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

      <SectionNav className="hidden gap-9 lg:flex" />

      <p className="hidden font-mono text-xs tracking-[0.04em] text-muted xl:block">
        DOSSIER 2026 · GEWIJZIGD {lastChanged()}
      </p>
    </header>
  )
}
