import { Link } from 'react-router-dom'
import SeoHead from '../components/SeoHead'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <SeoHead
        title="Pagina niet gevonden — Tijn van der Pol"
        description="Deze pagina bestaat niet of is niet beschikbaar."
        noIndex
      />
      <h1 className="text-3xl font-semibold text-slate-900">Pagina niet gevonden</h1>
      <p className="mt-2 text-slate-600">
        <Link to="/" className="text-slate-900 underline underline-offset-4">
          Terug naar home
        </Link>
      </p>
    </main>
  )
}
