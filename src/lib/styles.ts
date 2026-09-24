export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export const buttonPrimary = `inline-flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-50 ${focusRing}`

export const buttonSecondary = `inline-flex items-center gap-2 rounded-md border border-line bg-card px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink disabled:opacity-50 ${focusRing}`

export const buttonOutline = `inline-flex items-center gap-2 rounded-md border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper ${focusRing}`

export const inputField =
  'w-full rounded-md border border-line bg-card px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'

export const eyebrow = 'text-xs font-semibold uppercase tracking-[0.18em] text-accent'

export const tagPill = 'rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-strong'
