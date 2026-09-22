export default function LoadingState({ label = 'Laden…' }: { label?: string }) {
  return (
    <p role="status" aria-live="polite" className="py-12 text-center text-slate-500">
      {label}
    </p>
  )
}
