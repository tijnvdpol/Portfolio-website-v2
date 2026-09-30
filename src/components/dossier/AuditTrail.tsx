import { auditTrail, nextEntryNote } from '../../data/auditTrail'
import { home } from '../../data/home'

const copy = home.audit

// Donkere sectie: de groei als append-only lijst. Regels komen uit data/auditTrail.ts.
export default function AuditTrail() {
  return (
    <section
      id="groei"
      aria-labelledby="groei-title"
      className="anchor-offset flex flex-col gap-12 bg-ink px-4 py-20 text-paper md:px-10 lg:py-26 xl:px-20"
    >
      <div className="grid items-end gap-6 lg:grid-cols-[7fr_5fr] lg:gap-x-[72px]">
        <div className="flex flex-col gap-3.5">
          <p className="label-mono text-[13px] text-night-muted">{copy.label}</p>
          <h2 id="groei-title" className="head-cond text-[clamp(2.5rem,7vw,3.75rem)] leading-none">
            {copy.title}
          </h2>
        </div>
        <p className="text-[17px] leading-[1.6] text-night-body">{copy.intro}</p>
      </div>

      <div className="font-mono text-[15px]">
        <div
          aria-hidden="true"
          className="hidden grid-cols-[80px_140px_130px_minmax(0,1fr)_140px] gap-6 border-b border-night-rule-strong pb-3 text-[11px] tracking-[0.08em] text-night-muted md:grid"
        >
          <span>#</span>
          <span>DATUM</span>
          <span>SPRINT</span>
          <span>WIJZIGING</span>
          <span className="text-right">BEWIJS</span>
        </div>

        <ol className="flex flex-col" aria-label="Audit trail, nieuwste regel bovenaan">
          {auditTrail.map((entry) => (
            <li
              key={entry.number}
              className="grid gap-x-6 gap-y-1 border-b border-night-rule py-4 md:grid-cols-[80px_140px_130px_minmax(0,1fr)_140px]"
            >
              <span className="text-night-muted">{entry.number}</span>
              <span>{entry.date}</span>
              <span>{entry.sprint}</span>
              <span>
                <span className="text-night-plus" aria-hidden="true">
                  +{' '}
                </span>
                {entry.change}
              </span>
              <a
                href={entry.evidence.href}
                className="text-paper link-double focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night-plus md:text-right"
              >
                {entry.evidence.label} ↗
              </a>
            </li>
          ))}
        </ol>

        <p className="flex items-center gap-3 pt-5 text-[13px] text-night-muted">
          <span aria-hidden="true" className="inline-block h-[18px] w-[9px] bg-night-plus" />
          <span>{nextEntryNote}</span>
        </p>
      </div>
    </section>
  )
}
