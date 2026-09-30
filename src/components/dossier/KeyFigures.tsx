import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { formulaCells, markLegend } from '../../data/formulas'
import { home } from '../../data/home'
import { ctaSecondary } from '../../lib/styles'
import { useFormulaBar } from './FormulaContext'
import { MarkIcon } from './marks'

const copy = home.keyFigures

// Spreadsheet-raster: kolomkoppen A–D, rij 1. Elke cel is een <button>; hover, focus en klik
// zetten de formulebalk op de formule van dat cijfer. Op mobiel vervalt het kop-/rijraster.
export default function KeyFigures() {
  const { active, select } = useFormulaBar()
  const sectionRef = useRef<HTMLElement>(null)

  // De formulebalk hoort bij dit raster: scrolt het uit beeld, dan verdwijnt de balk weer.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) select(null)
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [select])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="kerncijfers-title"
      className="flex flex-col gap-5 px-4 pb-20 md:px-10 lg:pb-28 xl:px-20"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 id="kerncijfers-title" className="label-mono text-[13px] font-normal text-muted">
          {copy.title}
        </h2>
        <p className="font-mono text-xs text-muted">{copy.hint}</p>
      </div>

      <div className="grid grid-cols-1 border-t border-ink sm:grid-cols-2 md:border-l md:border-l-line lg:grid-cols-[48px_repeat(4,minmax(0,1fr))]">
        {/* Kolomkoppen en rijkop: alleen vanaf desktop, want daar lijkt het raster op een spreadsheet. */}
        <div aria-hidden="true" className="hidden border-r border-b border-line bg-paper-deep lg:block" />
        {formulaCells.map((cell) => (
          <div
            key={`head-${cell.column}`}
            aria-hidden="true"
            className={`hidden border-r border-b border-line px-4 py-1.5 font-mono text-xs text-muted transition-colors lg:block ${
              active?.column === cell.column ? 'bg-cell-head-active' : 'bg-paper-deep'
            }`}
          >
            {cell.column}
          </div>
        ))}
        <div
          aria-hidden="true"
          className="hidden border-r border-b border-ink bg-paper-deep py-6 text-center font-mono text-xs text-muted lg:block"
        >
          1
        </div>

        {formulaCells.map((cell) => {
          const selected = active?.column === cell.column
          return (
            <button
              key={cell.column}
              type="button"
              onMouseEnter={() => select(cell.column)}
              onFocus={() => select(cell.column)}
              onClick={() => select(cell.column)}
              aria-label={`${cell.address}: ${cell.value} ${cell.label}. Toon bron in formulebalk`}
              className={`flex cursor-cell flex-col gap-3.5 border-r border-b border-line bg-card px-6 pt-7 pb-8 text-left outline-none focus-visible:z-10 lg:border-b-ink ${
                selected ? 'shadow-[inset_0_0_0_2px_var(--color-accent)]' : ''
              } focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)]`}
            >
              <span className="flex items-start gap-2.5" aria-hidden="true">
                <span className="border-b-[5px] border-double border-ink pb-1.5 font-mono text-[64px] leading-none font-medium tracking-[-0.03em]">
                  {cell.value}
                </span>
                <MarkIcon mark={cell.mark} size={34} tilt={cell.markTilt} />
              </span>
              <span aria-hidden="true" className="text-base leading-[1.45] text-ink-soft">
                {cell.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-1 font-hand text-[22px] font-medium text-pen">
        <span className="label-mono font-mono text-[11px] font-normal text-muted">
          {copy.legendTitle}
        </span>
        {markLegend.map((item) => (
          <span key={item.mark} className="flex items-center gap-1.5">
            <MarkIcon mark={item.mark} size={24} tilt={item.tilt} />
            <span>{item.text}</span>
          </span>
        ))}
      </div>

      <div className="pt-4">
        <Link to={copy.auditLink.to} className={ctaSecondary}>
          {copy.auditLink.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
