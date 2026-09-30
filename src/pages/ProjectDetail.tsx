import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import EvidenceList from '../components/EvidenceList'
import LoadingState from '../components/LoadingState'
import MarkdownContent from '../components/MarkdownContent'
import SeoHead from '../components/SeoHead'
import NotFound from './NotFound'
import { useProject } from '../hooks/useProject'
import { formatProjectDate } from '../lib/format'
import { focusRing, tagPill } from '../lib/styles'

const shell = 'px-4 pt-10 pb-24 md:px-10 lg:pt-16 xl:px-20'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: project, loading, error, notFound } = useProject(slug)

  if (loading) {
    return (
      <main className={shell}>
        <LoadingState />
      </main>
    )
  }

  if (error) {
    return (
      <main className={shell}>
        <ErrorState message={error} />
      </main>
    )
  }

  if (notFound || !project) {
    return <NotFound />
  }

  const date = formatProjectDate(project.project_date)

  return (
    <main className={shell}>
      <SeoHead
        title={`${project.title} — Tijn van der Pol`}
        description={project.summary}
      />

      <Link to="/projecten" className={`text-base font-semibold link-double ${focusRing}`}>
        ← Alle dossiers
      </Link>

      <header className="fade-up mt-8 grid gap-10 border-b-4 border-double border-b-ink pb-10 lg:grid-cols-[7fr_5fr] lg:gap-x-[72px]">
        <div className="flex min-w-0 flex-col gap-5">
          {project.category ? (
            <p className="label-mono text-[13px] text-accent">{project.category}</p>
          ) : null}
          <h1 className="head-cond text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.98]">
            {project.title}
          </h1>
          <p className="max-w-[640px] text-lg leading-[1.55] text-ink-soft sm:text-xl">
            {project.summary}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {date ? <span className="font-mono text-xs text-muted">{date}</span> : null}
            {project.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className={tagPill}>
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {project.project_attachments.length > 0 ? (
          <EvidenceList attachments={project.project_attachments} />
        ) : null}
      </header>

      <div className="mx-auto mt-12 max-w-3xl lg:mt-16">
        {project.cover_image_url ? (
          <img
            src={project.cover_image_url}
            alt=""
            className="mb-12 w-full border-[1.5px] border-ink object-cover"
          />
        ) : null}
        <MarkdownContent content={project.content} />
      </div>
    </main>
  )
}
