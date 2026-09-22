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
      className={`rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
        active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 text-slate-600 hover:border-slate-400'
      }`}
    >
      {children}
    </button>
  )
}
