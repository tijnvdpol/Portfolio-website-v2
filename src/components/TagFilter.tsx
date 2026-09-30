import { focusRing } from '../lib/styles'

type TagFilterProps = {
  tags: string[]
  activeTag: string | null
  onSelect: (tag: string | null) => void
}

export default function TagFilter({ tags, activeTag, onSelect }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter op tag">
      <FilterButton active={activeTag === null} onClick={() => onSelect(null)}>
        Alle
      </FilterButton>
      {tags.map((tag) => (
        <FilterButton key={tag} active={activeTag === tag} onClick={() => onSelect(tag)}>
          {tag}
        </FilterButton>
      ))}
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-1.5 font-mono text-xs transition-colors ${focusRing} ${
        active
          ? 'border-ink bg-ink text-paper'
          : 'border-rule-strong bg-transparent text-ink-soft hover:border-ink hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}
