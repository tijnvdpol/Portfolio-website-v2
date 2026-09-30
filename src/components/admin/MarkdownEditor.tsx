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
        className="w-full resize-y border border-rule-strong bg-card p-3 font-mono text-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/30"
        placeholder="Schrijf de projectbeschrijving in markdown…"
      />
      <div className="border border-line bg-card p-3">
        <p className="label-mono mb-2 text-[11px] text-muted">
          Live preview
        </p>
        {value.trim() ? (
          <MarkdownContent content={value} />
        ) : (
          <p className="text-sm text-muted">Preview verschijnt hier.</p>
        )}
      </div>
    </div>
  )
}
