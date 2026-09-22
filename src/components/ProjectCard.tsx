import { Link } from 'react-router-dom'
import { formatProjectDate } from '../lib/format'
import type { Project } from '../types/database.types'

export default function ProjectCard({ project }: { project: Project }) {
  const date = formatProjectDate(project.project_date)

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 transition-shadow hover:shadow-md">
      <Link to={`/projecten/${project.slug}`} className="flex h-full flex-col">
        {project.cover_image_url ? (
          <img
            src={project.cover_image_url}
            alt=""
            className="h-40 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-40 w-full bg-slate-100" aria-hidden="true" />
        )}
        <div className="flex flex-1 flex-col gap-2 p-4">
          {project.category ? (
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {project.category}
            </span>
          ) : null}
          <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
          <p className="flex-1 text-sm text-slate-600">{project.summary}</p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
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
            {date ? <span className="shrink-0 text-xs text-slate-400">{date}</span> : null}
          </div>
        </div>
      </Link>
    </article>
  )
}
