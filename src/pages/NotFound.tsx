import { Link } from 'react-router-dom'
import SeoHead from '../components/SeoHead'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <SeoHead
        title="Pagina niet gevonden — Tijn van der Pol"
        description="Deze pagina bestaat niet of is niet beschikbaar."
        noIndex
      />
      <p className="font-display text-7xl font-medium text-accent tabular-nums">404</p>
      <h1 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink">
        Pagina niet gevonden
      </h1>
      <p className="mt-4 text-ink-soft">
        <Link to="/" className="text-accent underline underline-offset-4 hover:text-accent-strong">
          Terug naar home
        </Link>
      </p>
    </main>
  )
}
