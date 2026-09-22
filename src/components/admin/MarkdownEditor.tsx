import MarkdownContent from '../MarkdownContent'

type MarkdownEditorProps = {
  id?: string
  value: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({ id, value, onChange }: MarkdownEditorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={16}
        className="w-full resize-y rounded-md border border-slate-300 p-3 font-mono text-sm focus:border-slate-900 focus:outline-none"
        placeholder="Schrijf de projectbeschrijving in markdown…"
      />
      <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          Live preview
        </p>
        {value.trim() ? (
          <MarkdownContent content={value} />
        ) : (
          <p className="text-sm text-slate-400">Preview verschijnt hier.</p>
        )}
      </div>
    </div>
  )
}
