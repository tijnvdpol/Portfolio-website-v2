import { Link } from 'react-router-dom'
import {
  displayUrl,
  evidenceLabel,
  evidenceType,
  isRouteUrl,
  sortEvidence,
} from '../lib/evidence'
import { focusRing } from '../lib/styles'
import type { ProjectAttachment } from '../types/database.types'
import { TickMark } from './dossier/marks'

const rowClass = `group flex items-center gap-3 border-b border-line py-3 ${focusRing}`

export default function EvidenceList({ attachments }: { attachments: ProjectAttachment[] }) {
  if (attachments.length === 0) return null

  return (
    <section aria-labelledby="bewijslast-titel" className="flex flex-col gap-3">
      <h2 id="bewijslast-titel" className="label-mono text-[11px] font-normal text-muted">
        Onderbouwing
      </h2>
      <ul className="border-t border-ink">
        {sortEvidence(attachments).map((attachment) => {
          const internal = isRouteUrl(attachment.file_url)
          const content = (
            <>
              <TickMark size={22} strokeWidth={2.8} />
              <span className="flex min-w-0 grow flex-col">
                <span className="label-mono text-[11px] text-muted">
                  {evidenceLabel(evidenceType(attachment.file_type))}
                </span>
                <span className="text-[15px] font-semibold group-hover:underline group-hover:decoration-double group-hover:decoration-[1.5px] group-hover:underline-offset-[5px]">
                  {attachment.file_name}
                </span>
                <span className="truncate font-mono text-xs text-muted">
                  {displayUrl(attachment.file_url)}
                </span>
              </span>
              <span aria-hidden="true" className="text-lg">
                {internal ? '→' : '↗'}
              </span>
            </>
          )

          return (
            <li key={attachment.id} className="min-w-0">
              {internal ? (
                <Link to={attachment.file_url} className={rowClass}>
                  {content}
                </Link>
              ) : (
                <a
                  href={attachment.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
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
