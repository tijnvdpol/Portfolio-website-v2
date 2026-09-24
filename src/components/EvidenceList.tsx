import { Link } from 'react-router-dom'
import {
  displayUrl,
  evidenceLabel,
  evidenceType,
  isInternalUrl,
  sortEvidence,
} from '../lib/evidence'
import { focusRing } from '../lib/styles'
import type { ProjectAttachment } from '../types/database.types'

const cardClass = `group flex h-full flex-col gap-1 rounded-xl border border-line bg-card p-4 transition-colors hover:border-accent ${focusRing}`

export default function EvidenceList({ attachments }: { attachments: ProjectAttachment[] }) {
  if (attachments.length === 0) return null

  return (
    <section aria-labelledby="bewijslast-titel">
      <h2
        id="bewijslast-titel"
        className="text-xs font-semibold uppercase tracking-[0.18em] text-accent"
      >
        Bewijslast
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sortEvidence(attachments).map((attachment) => {
          const internal = isInternalUrl(attachment.file_url)
          const content = (
            <>
              <span className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
                {evidenceLabel(evidenceType(attachment.file_type))}
                <span
                  aria-hidden="true"
                  className="text-base text-accent transition-transform group-hover:translate-x-0.5"
                >
                  {internal ? '→' : '↗'}
                </span>
              </span>
              <span className="font-medium text-ink group-hover:text-accent">
                {attachment.file_name}
              </span>
              <span className="truncate text-xs text-muted">{displayUrl(attachment.file_url)}</span>
            </>
          )

          return (
            <li key={attachment.id} className="min-w-0">
              {internal ? (
                <Link to={attachment.file_url} className={cardClass}>
                  {content}
                </Link>
              ) : (
                <a
                  href={attachment.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {content}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
