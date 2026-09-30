import { Link } from 'react-router-dom'
import SeoHead from '../components/SeoHead'
import { focusRing } from '../lib/styles'

export default function NotFound() {
  return (
    <main className="flex flex-col gap-6 px-4 pt-16 pb-28 md:px-10 lg:pt-24 xl:px-20">
      <SeoHead
        title="Pagina niet gevonden — Tijn van der Pol"
        description="Deze pagina bestaat niet of is niet beschikbaar."
        noIndex
      />
      <p className="label-mono text-[13px] text-muted">FOUT 404 · STUK NIET GEVONDEN</p>
      <h1 className="head-cond max-w-[18ch] text-[clamp(2.75rem,8vw,5rem)] leading-[0.98]">
        Dit stuk zit niet <span className="text-accent">in het dossier.</span>
      </h1>
      <p className="max-w-[560px] text-lg leading-[1.55] text-ink-soft">
        Deze pagina bestaat niet of is verplaatst.
      </p>
      <Link to="/" className={`self-start text-base font-semibold link-double ${focusRing}`}>
        ← Terug naar het dossier
      </Link>
    </main>
  )
}
