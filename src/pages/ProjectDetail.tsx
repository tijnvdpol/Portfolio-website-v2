import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import MarkdownContent from '../components/MarkdownContent'
import SeoHead from '../components/SeoHead'
import NotFound from './NotFound'
import { useProject } from '../hooks/useProject'
import { formatProjectDate } from '../lib/format'

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

      <Link to="/projecten" className="text-sm text-slate-500 hover:text-slate-900">
        ← Alle projecten
      </Link>

      <header className="mt-4">
        {project.category ? (
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {project.category}
          </span>
        ) : null}
        <h1 className="mt-1 text-3xl font-semibold text-slate-900">{project.title}</h1>
        <p className="mt-2 text-lg text-slate-600">{project.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {date ? <span className="text-sm text-slate-400">{date}</span> : null}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {project.cover_image_url ? (
        <img
          src={project.cover_image_url}
          alt=""
          className="mt-8 w-full rounded-lg object-cover"
        />
      ) : null}

      <div className="mt-8">
        <MarkdownContent content={project.content} />
      </div>

      {project.project_attachments.length > 0 ? (
        <section className="mt-10 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold text-slate-900">Bijlagen</h2>
          <ul className="mt-3 space-y-2">
            {project.project_attachments.map((attachment) => (
              <li key={attachment.id}>
                <a
                  href={attachment.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-700 underline underline-offset-4 hover:text-slate-900"
                >
                  {attachment.file_name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  )
}
