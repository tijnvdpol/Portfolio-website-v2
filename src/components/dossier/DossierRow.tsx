import { Link } from 'react-router-dom'
import { home } from '../../data/home'
import { isRouteUrl } from '../../lib/evidence'
import { formatMonthYear } from '../../lib/format'
import type { Dossier } from '../../lib/dossiers'
import { focusRing } from '../../lib/styles'
import type { DossierStamp } from '../../types/database.types'
import { TickMark } from './marks'

const copy = home.dossiers

function Stamp({ stamp }: { stamp: DossierStamp }) {
  return (
    <div
      className="flex flex-col items-center gap-0.5 rounded-sm border-[3px] border-accent px-4 py-2.5 font-mono text-accent shadow-[inset_0_0_0_2px_var(--color-paper),inset_0_0_0_3px_var(--color-accent)]"
      style={{ transform: `rotate(${stamp.tilt}deg)` }}
    >
      <span className="text-[10px] tracking-[0.14em]">{stamp.label}</span>
      <span className="text-base font-semibold tracking-[0.08em]">{stamp.value}</span>
      <span className="text-[10px] tracking-[0.08em]">{stamp.detail}</span>
    </div>
  )
}

function EvidenceLine({ label, href }: { label: string; href?: string }) {
  const external = href ? /^https?:/.test(href) : false
  const content = (
    <>
      <TickMark size={22} strokeWidth={2.8} />
      <span className="grow">{label}</span>
      {href ? <span aria-hidden="true">{external || !isRouteUrl(href) ? '↗' : '→'}</span> : null}
    </>
  )
  const lineClass = 'flex items-center gap-2.5 border-b border-line pb-2 text-[15px]'

  if (!href) return <li className={lineClass}>{content}</li>

  const isRoute = isRouteUrl(href)
  return (
    <li>
      {isRoute ? (
        <Link to={href} className={`${lineClass} link-double ${focusRing}`}>
          {content}
        </Link>
      ) : (
        <a
          href={href}
          {...(external || !isRoute ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`${lineClass} link-double ${focusRing}`}
        >
          {content}
        </a>
      )}
    </li>
  )
}

export default function DossierRow({ dossier, isFirst, isLast }: { dossier: Dossier; isFirst: boolean; isLast: boolean }) {
  return (
    <article
      className={`grid gap-y-6 pt-9 pb-10 lg:grid-cols-[120px_minmax(0,1fr)_340px_170px] lg:gap-x-10 ${
        isFirst ? 'border-t-[1.5px]' : 'border-t'
      } border-ink ${isLast ? 'border-b-4 border-double border-b-ink' : ''}`}
    >
      <div className="flex items-baseline gap-4 font-mono lg:flex-col lg:gap-1.5">
        <span className="text-xl font-semibold">{dossier.number}</span>
        <span className="text-xs text-muted">{formatMonthYear(dossier.project_date)}</span>
      </div>

      <div className="flex min-w-0 flex-col gap-3.5">
        {dossier.category ? (
          <span className="label-mono text-xs text-accent">{dossier.category}</span>
        ) : null}
        <h3 className="head-cond-75 text-[28px] leading-[1.05] sm:text-[34px]">
          <Link to={`/projecten/${dossier.slug}`} className={`link-double ${focusRing}`}>
            {dossier.title}
          </Link>
        </h3>
        <p className="text-[17px] leading-[1.55] text-ink-soft">{dossier.summary}</p>
        {dossier.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2 font-mono text-xs text-ink-soft">
            {dossier.tags.map((tag) => (
              <li key={tag} className="border border-rule-strong px-2 py-[3px]">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex flex-col gap-2.5 empty:hidden lg:empty:flex">
        {dossier.evidence.length > 0 ? (
          <>
            <span className="label-mono text-[11px] text-muted">{copy.evidenceTitle}</span>
            <ul className="flex flex-col gap-2.5">
              {dossier.evidence.map((item) => (
                <EvidenceLine key={item.label} {...item} />
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <div className="flex items-start empty:hidden lg:empty:flex lg:justify-center lg:pt-6">
        {dossier.stamp ? <Stamp stamp={dossier.stamp} /> : null}
      </div>
    </article>
  )
}
