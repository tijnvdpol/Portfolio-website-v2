// '2026-09-30' → '30-09-2026'
export function formatShortDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-')
  return `${day}-${month}-${year}`
}

// '2026-09-23' → 'sep 2026'
export function formatMonthYear(isoDate: string | null): string | null {
  if (!isoDate) return null
  return new Date(isoDate).toLocaleDateString('nl-NL', { month: 'short', year: 'numeric' })
}

export function lastChanged(): string {
  return formatShortDate(__LAST_CHANGED__)
}

export function formatProjectDate(date: string | null): string | null {
  if (!date) return null
  return new Date(date).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
  })
}
