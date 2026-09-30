import { useState, type KeyboardEvent } from 'react'

type TagsInputProps = {
  id?: string
  value: string[]
  onChange: (tags: string[]) => void
}

export default function TagsInput({ id, value, onChange }: TagsInputProps) {
  const [draft, setDraft] = useState('')

  function commitDraft() {
    const tag = draft.trim().toLowerCase()
    if (tag && !value.includes(tag)) {
      onChange([...value, tag])
    }
    setDraft('')
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      commitDraft()
    } else if (event.key === 'Backspace' && draft === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 border border-rule-strong bg-card p-2 focus-within:border-ink focus-within:ring-2 focus-within:ring-accent/30">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 border border-rule-strong px-2 py-[3px] font-mono text-xs text-ink-soft"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Verwijder tag ${tag}`}
              className="text-muted hover:text-ink"
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder={value.length === 0 ? 'Typ een tag en druk op Enter' : ''}
          className="min-w-32 flex-1 border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
        />
      </div>
      <p className="mt-1 text-xs text-muted">Druk op Enter of komma om een tag toe te voegen.</p>
    </div>
  )
}
