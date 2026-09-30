export default function LoadingState({ label = 'Laden…' }: { label?: string }) {
  return (
    <p role="status" aria-live="polite" className="label-mono py-12 text-sm text-muted">
      {label}
    </p>
  )
}
