import type { Mark } from '../../data/formulas'

// Getekende tekens in "rode pen" (viewBox 30×30, ronde uiteinden). Alle SVG's zijn decoratief.

const PATHS: Record<Mark, string[]> = {
  check: ['M4 16 C6.5 17.5 9 20.5 11 24 C14 16 19 9 26 4'],
  match: ['M4 15 C12 14.5 19 14.5 26 15', 'M8 10.5 L3.5 15 L8 19.5', 'M22 10.5 L26.5 15 L22 19.5'],
  sum: ['M23 6 C18 5.5 12 5.5 7 6.5 L15 15 L7 24 C12 23.5 18 23.5 24 24'],
}

type MarkIconProps = {
  mark: Mark
  size?: number
  tilt?: number
  strokeWidth?: number
  className?: string
}

export function MarkIcon({ mark, size = 24, tilt = -6, strokeWidth = 2.6, className }: MarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 text-pen ${className ?? ''}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {PATHS[mark].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export function TickMark(props: Omit<MarkIconProps, 'mark'>) {
  return <MarkIcon mark="check" {...props} />
}

// Pijltje bij de handgeschreven aantekening onder de hero-kop.
export function NoteArrow() {
  return (
    <svg
      width="34"
      height="22"
      viewBox="0 0 34 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M31 18 C22 19 12 15 5 5" />
      <path d="M4 12 C4 9 4.5 6.5 5 4.5 C7.5 5 10 5.2 12 5" />
    </svg>
  )
}

export function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="11" width="16" height="10" rx="1" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

export function CameraIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M8 5l1.5-2h5L16 5" />
    </svg>
  )
}

export function Paperclip() {
  return (
    <svg
      width="22"
      height="52"
      viewBox="0 0 22 52"
      fill="none"
      stroke="#7D828A"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      className="absolute -top-[26px] left-7"
      style={{ transform: 'rotate(8deg)' }}
    >
      <path d="M7 16 V40 a4 4 0 0 0 8 0 V10 a6 6 0 0 0 -12 0 V38" />
    </svg>
  )
}
