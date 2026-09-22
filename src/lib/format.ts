export function formatProjectDate(date: string | null): string | null {
  if (!date) return null
  return new Date(date).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
  })
}
