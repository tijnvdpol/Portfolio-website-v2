import { useReducer } from 'react'
import { home, type DemoLogEntry } from '../../data/home'
import { focusRing } from '../../lib/styles'
import { LockIcon } from './marks'

const demo = home.demo

type State = { status: 'idle' | 'refused' | 'approved'; extra: DemoLogEntry[] }
type Action = { type: 'approve' | 'colleague'; time: string } | { type: 'reset' }

const initialState: State = { status: 'idle', extra: [] }

// idle → refused → approved, met reset. Elke actie voegt een regel toe aan de audit trail;
// reset leegt alleen de toegevoegde regels (de twee beginregels blijven staan).
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'approve':
      return {
        status: 'refused',
        extra: [
          ...state.extra,
          {
            time: action.time,
            who: 'jij',
            what: 'poging tot goedkeuring',
            result: 'GEWEIGERD',
            tone: 'danger',
          },
        ],
      }
    case 'colleague':
      return {
        status: 'approved',
        extra: [
          ...state.extra,
          {
            time: action.time,
            who: 'collega',
            what: 'goedgekeurd (rol: goedkeurder)',
            result: 'OK',
            tone: 'accent',
          },
        ],
      }
    case 'reset':
      return initialState
  }
}

function currentTime(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`
}

const TONE_CLASS: Record<DemoLogEntry['tone'], string> = {
  neutral: 'text-ink-soft',
  signal: 'text-signal',
  danger: 'text-danger',
  accent: 'text-accent',
}

const buttonSolid = `bg-ink font-semibold text-paper transition-colors hover:bg-accent ${focusRing}`
const buttonLine = `border-[1.5px] border-ink font-semibold text-ink transition-colors hover:bg-ink hover:text-paper ${focusRing}`

export default function InvoiceDemo() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const log = [...demo.initialLog, ...state.extra]

  return (
    <section
      aria-labelledby="demo-title"
      className="flex flex-col border-[1.5px] border-ink bg-card"
    >
      <div className="label-mono flex items-center justify-between border-b border-ink px-5 py-3.5 text-xs">
        <h2 id="demo-title" className="font-normal">
          {demo.title}
        </h2>
        <span className="text-muted">{demo.subtitle}</span>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-6 pb-5">
        <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
          {demo.invoice.map((field) => (
            <div key={field.label} className="flex min-w-0 flex-col gap-1">
              <dt className="label-mono text-[11px] text-muted">{field.label}</dt>
              <dd
                className={
                  field.kind === 'text'
                    ? 'text-base font-semibold'
                    : field.kind === 'amount'
                      ? 'font-mono text-[22px] font-semibold'
                      : 'font-mono text-[15px]'
                }
              >
                {field.value}
              </dd>
            </div>
          ))}
          <div className="flex flex-col items-start gap-1">
            <dt className="label-mono text-[11px] text-muted">{demo.signalLabel}</dt>
            <dd className="border border-signal px-2 py-[3px] font-mono text-xs text-signal">
              {demo.signal}
            </dd>
          </div>
        </dl>

        {state.status === 'idle' ? (
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => dispatch({ type: 'approve', time: currentTime() })}
              className={`h-[52px] text-base ${buttonSolid}`}
            >
              {demo.approve}
            </button>
            <span className="text-sm text-muted">{demo.hint}</span>
          </div>
        ) : null}

        {state.status === 'refused' ? (
          <div className="flex flex-col gap-3.5">
            <div
              role="alert"
              className="flex flex-col gap-1.5 border-[1.5px] border-danger bg-danger-bg px-[18px] py-4"
            >
              <span className="font-mono text-[13px] font-semibold tracking-[0.06em] text-danger">
                {demo.refusedTitle}
              </span>
              <span className="text-[15px] leading-normal text-[#3a1410]">{demo.refusedText}</span>
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => dispatch({ type: 'colleague', time: currentTime() })}
                className={`h-12 grow px-3 text-[15px] ${buttonSolid}`}
              >
                {demo.colleague}
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: 'reset' })}
                className={`h-12 px-[18px] text-[15px] ${buttonLine}`}
              >
                {demo.reset}
              </button>
            </div>
          </div>
        ) : null}

        {state.status === 'approved' ? (
          <>
            <div className="flex items-center gap-5" role="status">
              <span className="-rotate-[5deg] shrink-0 rounded-sm border-[3px] border-accent px-3.5 py-2 font-mono text-[15px] font-semibold tracking-[0.1em] text-accent">
                {demo.approvedStamp}
              </span>
              <span className="text-[15px] leading-normal text-ink-soft">{demo.approvedText}</span>
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: 'reset' })}
              className={`h-11 text-[15px] ${buttonLine}`}
            >
              {demo.retry}
            </button>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 border-t border-dashed border-rule-strong bg-[#f6f4ee] px-5 pt-3.5 pb-[18px]">
        <div className="label-mono flex items-center gap-2 text-[11px] text-muted">
          <LockIcon />
          <span>{demo.logTitle}</span>
        </div>
        <ul className="flex flex-col gap-2 sm:gap-1" role="log" aria-label="Audit trail van de demo">
          {log.map((entry, index) => (
            <li
              key={`${entry.time}-${index}`}
              className="grid grid-cols-[44px_minmax(0,1fr)_auto] gap-x-2 font-mono text-xs text-ink-soft sm:grid-cols-[48px_100px_minmax(0,1fr)_84px]"
            >
              <span>{entry.time}</span>
              <span className="hidden sm:inline">{entry.who}</span>
              <span>
                <span className="sm:hidden">{entry.who}: </span>
                {entry.what}
              </span>
              <span className={`text-right font-semibold ${TONE_CLASS[entry.tone]}`}>
                {entry.result}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
