import { Link } from 'react-router-dom'
import { formatProjectDate } from '../lib/format'
import { focusRing, tagPill } from '../lib/styles'
import type { Project } from '../types/database.types'

export default function ProjectCard({ project }: { project: Project }) {
  const date = formatProjectDate(project.project_date)

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-card transition duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_12px_32px_-16px_rgb(22_24_29/0.25)]">
      <Link to={`/projecten/${project.slug}`} className={`flex h-full flex-col rounded-xl ${focusRing}`}>
        <div className="overflow-hidden border-b border-line">
          {project.cover_image_url ? (
            <img
              src={project.cover_image_url}
              alt=""
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="ledger-pattern h-44 w-full" aria-hidden="true" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          {project.category ? (
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {project.category}
            </span>
          ) : null}
          <h3 className="font-display text-xl leading-snug font-medium text-ink">
            {project.title}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-ink-soft">{project.summary}</p>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 mt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className={tagPill}>
                  {tag}
                </span>
              ))}
            </div>
            {date ? <span className="shrink-0 text-xs text-muted tabular-nums">{date}</span> : null}
          </div>
        </div>
      </Link>
    </article>
  )
}
