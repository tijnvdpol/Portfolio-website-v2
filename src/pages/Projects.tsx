import { useSearchParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import ProjectCard from '../components/ProjectCard'
import SeoHead from '../components/SeoHead'
import TagFilter from '../components/TagFilter'
import { useProjects, useTags } from '../hooks/useProjects'
import { eyebrow } from '../lib/styles'

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
    <main className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <SeoHead
        title="Projecten — Tijn van der Pol"
        description="Projecten van Tijn van der Pol: webapplicaties, AI-tools en onderzoek op het snijvlak van finance en AI, elk met bewijslast."
      />

      <p className={eyebrow}>Portfolio</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        Projecten
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Webapplicaties, AI-tools en onderzoek op het snijvlak van finance en AI. Bij elk project
        vind je de bewijslast: een live demo, de broncode of het volledige rapport.
      </p>

      {tags && tags.length > 0 ? (
        <div className="mt-8 border-y border-line py-4">
          <TagFilter tags={tags} activeTag={activeTag} onSelect={handleSelectTag} />
        </div>
      ) : null}

      {loading ? <LoadingState /> : null}
      {error ? <ErrorState message={error} /> : null}

      {projects && projects.length === 0 ? (
        <p className="mt-8 text-muted">Geen projecten gevonden voor deze filter.</p>
      ) : null}

      {projects && projects.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : null}
    </main>
  )
}
