import { Link } from 'react-router-dom'
import { home } from '../../data/home'
import { useDossiers } from '../../hooks/useDossiers'
import { lastChanged } from '../../lib/format'
import { ctaPrimary } from '../../lib/styles'
import ErrorState from '../ErrorState'
import LoadingState from '../LoadingState'
import DossierRow from './DossierRow'

const copy = home.dossiers

export default function Dossiers() {
  const { data: dossiers, loading, error } = useDossiers({ featuredOnly: true })

  return (
    <section
      id="dossiers"
      aria-labelledby="dossiers-title"
      className="anchor-offset flex flex-col px-4 pb-24 md:px-10 lg:pb-30 xl:px-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 pb-8">
        <div className="flex flex-col gap-3.5">
          <p className="label-mono text-[13px] text-muted">{copy.label}</p>
          <h2 id="dossiers-title" className="head-cond text-[clamp(2.5rem,7vw,3.75rem)] leading-none">
            {copy.title}
          </h2>
        </div>
        <Link to={copy.allLink.to} className={ctaPrimary}>
          {copy.allLink.label} <span aria-hidden="true">→</span>
        </Link>
      </div>

      {loading ? <LoadingState label="Dossiers laden…" /> : null}
      {error ? <ErrorState message={error} /> : null}

      {dossiers && dossiers.length === 0 ? (
        <p className="border-t border-ink pt-6 text-muted">Nog geen dossiers.</p>
      ) : null}

      {dossiers && dossiers.length > 0 ? (
        <>
          <div>
            {dossiers.map((dossier, index) => (
              <DossierRow
                key={dossier.id}
                dossier={dossier}
                isFirst={index === 0}
                isLast={index === dossiers.length - 1}
              />
            ))}
          </div>

          <div className="flex justify-end pt-7">
            <div className="flex items-end gap-7">
              <div className="label-mono flex flex-col gap-1 pb-2 text-right text-[11px] text-muted">
                <span>{copy.signedTitle}</span>
                <span>
                  {copy.signedBy} · {lastChanged()}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="min-w-[140px] -rotate-6 border-b border-ink px-5 pb-0.5 text-center font-sign text-[72px] leading-none sm:min-w-[180px]"
              >
                TvdP
              </span>
            </div>
          </div>
        </>
      ) : null}
    </section>
  )
}
