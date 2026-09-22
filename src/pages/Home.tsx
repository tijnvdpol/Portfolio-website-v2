import { Link } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import ProjectCard from '../components/ProjectCard'
import SeoHead from '../components/SeoHead'
import { useFeaturedProjects } from '../hooks/useProjects'
import { buttonOutline } from '../lib/styles'

export default function Home() {
  const { data: projects, loading, error } = useFeaturedProjects()

  return (
    <main>
      <SeoHead
        title="Tijn van der Pol — Portfolio"
        description="Portfolio van Tijn van der Pol, student Finance & Control: overnameanalyses, financiële modellen, strategische analyses en minor-projecten."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Finance &amp; Control
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Tijn van der Pol
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
          Derdejaars student Finance &amp; Control. Dit portfolio toont een selectie van mijn
          werk: overnameanalyses, financiële modellen, strategische analyses en projecten uit mijn
          minor.
        </p>
        <Link to="/projecten" className={`${buttonOutline} mt-6`}>
          Bekijk alle projecten
        </Link>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900">Uitgelicht</h2>

          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}

          {projects && projects.length === 0 ? (
            <p className="mt-4 text-slate-500">Nog geen uitgelichte projecten.</p>
          ) : null}

          {projects && projects.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
