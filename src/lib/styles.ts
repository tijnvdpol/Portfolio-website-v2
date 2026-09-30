export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

// Knoppen en labels van de dossierstijl: vierkant, zwaar, Archivo/Plex Mono.
export const ctaPrimary = `inline-flex h-[52px] items-center gap-2.5 bg-ink px-6 text-base font-semibold text-paper transition-colors hover:bg-accent ${focusRing}`

export const ctaSecondary = `inline-flex h-[52px] items-center gap-2.5 border-[1.5px] border-ink px-6 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-paper ${focusRing}`

// Compacte varianten voor de beheeromgeving.
export const buttonPrimary = `inline-flex h-11 items-center justify-center gap-2 bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-accent disabled:opacity-50 ${focusRing}`

export const buttonSecondary = `inline-flex h-11 items-center justify-center gap-2 border-[1.5px] border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-50 ${focusRing}`

export const inputField =
  'w-full border border-rule-strong bg-card px-3 py-2 text-[15px] focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/30'

export const tagPill = 'border border-rule-strong px-2 py-[3px] font-mono text-xs text-ink-soft'
