import { focusRing } from '../../lib/styles'
import { useFormulaBar } from './FormulaContext'

// Excel-formulebalk: celadres | fx | formule + resultaat | bron. Verschijnt alleen als een
// kerncijfer is aangewezen en hangt dan onder de header (geen verspringende pagina). De
// wrapper blijft gemonteerd zodat aria-live de verschijnende formule aan schermlezers meldt.
export default function FormulaBar() {
  const { active } = useFormulaBar()
  const external = active ? /^https?:/.test(active.href) : false

  return (
    <div
      aria-live="polite"
      className="pointer-events-none absolute inset-x-0 top-full px-4 md:px-10 xl:px-20 print:hidden"
    >
      {active ? (
        <div
          role="group"
          aria-label="Formulebalk"
          className="pointer-events-auto flex h-10 items-stretch border-x border-line border-b-[3px] border-double border-b-ink bg-card font-mono text-[13px] shadow-[0_8px_16px_-8px_rgba(21,23,26,0.25)] motion-safe:animate-[bar-in_0.18s_ease-out]"
        >
          <div className="flex w-14 shrink-0 items-center justify-center border-r border-line font-semibold sm:w-[72px]">
            {active.address}
          </div>
          <div className="flex w-9 shrink-0 items-center justify-center border-r border-line italic text-muted sm:w-11">
            fx
          </div>
          <div className="flex min-w-0 grow items-center gap-3.5 overflow-hidden px-3 whitespace-nowrap sm:px-4">
            <span className="truncate text-ink">{active.formula}</span>
            <span className="shrink-0 text-muted">{active.result}</span>
          </div>
          <a
            href={active.href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`flex shrink-0 items-center gap-1.5 border-l border-line px-3 whitespace-nowrap text-accent link-double sm:px-4 ${focusRing}`}
          >
            bron ↗
          </a>
        </div>
      ) : null}
    </div>
  )
}
