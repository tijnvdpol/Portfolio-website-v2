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

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: project, loading, error, notFound } = useProject(slug)

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <LoadingState />
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <ErrorState message={error} />
      </main>
    )
  }

  if (notFound || !project) {
    return <NotFound />
  }

  const date = formatProjectDate(project.project_date)

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <SeoHead
        title={`${project.title} — Tijn van der Pol`}
        description={project.summary}
      />

      <Link
        to="/projecten"
        className={`rounded-sm text-sm font-medium text-muted transition-colors hover:text-accent ${focusRing}`}
      >
        ← Alle projecten
      </Link>

      <header className="fade-up mt-6 border-b border-line pb-8">
        {project.category ? (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {project.category}
          </span>
        ) : null}
        <h1 className="mt-3 font-display text-4xl leading-tight font-medium tracking-tight text-ink sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{project.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {date ? <span className="text-sm text-muted tabular-nums">{date}</span> : null}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={tagPill}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {project.project_attachments.length > 0 ? (
        <div className="mt-8">
          <EvidenceList attachments={project.project_attachments} />
        </div>
      ) : null}

      {project.cover_image_url ? (
        <img
          src={project.cover_image_url}
          alt=""
          className="mt-10 w-full rounded-xl border border-line object-cover"
        />
      ) : null}

      <div className="mt-10">
        <MarkdownContent content={project.content} />
      </div>
    </main>
  )
}
