import { useSearchParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import ProjectCard from '../components/ProjectCard'
import SeoHead from '../components/SeoHead'
import TagFilter from '../components/TagFilter'
import { useProjects, useTags } from '../hooks/useProjects'

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTag = searchParams.get('tag')

  const { data: tags } = useTags()
  const { data: projects, loading, error } = useProjects(activeTag ?? undefined)

  function handleSelectTag(tag: string | null) {
    if (tag) {
      setSearchParams({ tag })
    } else {
      setSearchParams({})
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SeoHead
        title="Projecten — Tijn van der Pol"
        description="Overzicht van projecten van Tijn van der Pol: overnameanalyses, financiële modellen, strategische analyses en minor-projecten."
      />

      <h1 className="text-3xl font-semibold text-slate-900">Projecten</h1>

      {tags && tags.length > 0 ? (
        <div className="mt-6">
          <TagFilter tags={tags} activeTag={activeTag} onSelect={handleSelectTag} />
        </div>
      ) : null}

      {loading ? <LoadingState /> : null}
      {error ? <ErrorState message={error} /> : null}

      {projects && projects.length === 0 ? (
        <p className="mt-8 text-slate-500">Geen projecten gevonden voor deze filter.</p>
      ) : null}

      {projects && projects.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : null}
    </main>
  )
}
