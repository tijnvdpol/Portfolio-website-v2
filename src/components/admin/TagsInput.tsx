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
      <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-slate-300 p-2 focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/20">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Verwijder tag ${tag}`}
              className="text-slate-400 hover:text-slate-700"
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
      <p className="mt-1 text-xs text-slate-400">Druk op Enter of komma om een tag toe te voegen.</p>
    </div>
  )
}
