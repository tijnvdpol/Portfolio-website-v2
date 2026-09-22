import { Link, useParams } from 'react-router-dom'
import SeoHead from '../../components/SeoHead'

export default function AdminProjectForm() {
  const { id } = useParams<{ id: string }>()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <SeoHead
        title={id ? 'Project bewerken — Beheer' : 'Nieuw project — Beheer'}
        description="Project aanmaken of bewerken."
        noIndex
      />

      <Link to="/admin" className="text-sm text-slate-500 hover:text-slate-900">
        ← Terug naar overzicht
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">
        {id ? 'Project bewerken' : 'Nieuw project'}
      </h1>
      <p className="mt-2 text-slate-600">Placeholder — wordt ingevuld in fase 5.</p>
    </main>
  )
}
