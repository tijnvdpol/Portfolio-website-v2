import { Link } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import ProjectCard from '../components/ProjectCard'
import SeoHead from '../components/SeoHead'
import { about } from '../data/about'
import { useFeaturedProjects } from '../hooks/useProjects'
import { buttonPrimary, buttonSecondary, eyebrow, focusRing } from '../lib/styles'

const focusAreas = [
  'Overnameanalyses',
  'Financiële modellen',
  'Strategische analyses',
  'Minor-projecten',
]

export default function Home() {
  const { data: projects, loading, error } = useFeaturedProjects()

  return (
    <main>
      <SeoHead
        title="Tijn van der Pol — Portfolio"
        description="Portfolio van Tijn van der Pol, student Finance & Control: overnameanalyses, financiële modellen, strategische analyses en minor-projecten."
      />

      <section className="mx-auto grid max-w-5xl items-end gap-12 px-4 pt-16 pb-20 sm:pt-24 lg:grid-cols-12">
        <div className="fade-up lg:col-span-8">
          <p className={eyebrow}>Finance &amp; Control · Portfolio</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] font-medium tracking-tight text-ink sm:text-6xl">
            Tijn van der Pol
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Vierdejaars student Finance &amp; Control. Dit portfolio toont een selectie van mijn
            werk: overnameanalyses, financiële modellen, strategische analyses en projecten uit mijn
            minor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projecten" className={buttonPrimary}>
              Bekijk alle projecten <span aria-hidden="true">→</span>
            </Link>
            <Link to="/over-mij" className={buttonSecondary}>
              Over mij
            </Link>
          </div>
        </div>

        <div className="fade-up lg:col-span-4 [animation-delay:120ms]">
          <div className="rounded-xl border border-line bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Aandachtsgebieden
            </p>
            <ol className="mt-4 divide-y divide-line">
              {focusAreas.map((area, index) => (
                <li key={area} className="flex items-baseline gap-4 py-2.5">
                  <span className="font-display text-sm text-accent tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium text-ink">{area}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-deep/60">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={eyebrow}>Geselecteerd werk</p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
                Uitgelicht
              </h2>
            </div>
            <Link
              to="/projecten"
              className={`rounded-sm text-sm font-medium text-ink-soft transition-colors hover:text-accent ${focusRing}`}
            >
              Alle projecten →
            </Link>
          </div>

          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}

          {projects && projects.length === 0 ? (
            <p className="mt-6 text-muted">Nog geen uitgelichte projecten.</p>
          ) : null}

          {projects && projects.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="grid items-center gap-8 rounded-xl border border-line bg-card p-8 sm:p-10 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Benieuwd wie er achter dit werk zit?
            </h2>
            <p className="mt-2 max-w-xl text-ink-soft">{about.availability}</p>
          </div>
          <Link to="/over-mij" className={buttonPrimary}>
            Maak kennis <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
