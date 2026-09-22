import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">Project: {slug}</h1>
      <p className="mt-2 text-slate-600">Placeholder — wordt ingevuld in fase 3.</p>
    </main>
  )
}
