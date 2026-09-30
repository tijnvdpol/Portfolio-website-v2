import { Link, useParams } from 'react-router-dom'
import PdfViewer from '../components/PdfViewer'
import SeoHead from '../components/SeoHead'
import { findDocument } from '../data/documents'
import { ctaPrimary, focusRing } from '../lib/styles'
import NotFound from './NotFound'

// Ingebouwde pdf-reader: het document staat op de pagina zelf, met een knop om het te downloaden.
export default function DocumentReader() {
  const { slug } = useParams<{ slug: string }>()
  const doc = findDocument(slug)

  if (!doc) return <NotFound />

  return (
    <main className="px-4 pt-10 pb-24 md:px-10 lg:pt-16 xl:px-20">
      <SeoHead title={`${doc.title} — Tijn van der Pol`} description={doc.subtitle} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to={`/projecten/${doc.projectSlug}`}
          className={`text-base font-semibold link-double ${focusRing}`}
        >
          ← Terug naar het dossier
        </Link>
        <a href={doc.file} download={doc.downloadName} className={ctaPrimary}>
          Download pdf <span aria-hidden="true">↓</span>
        </a>
      </div>

      <header className="fade-up mt-8 flex flex-col gap-5 border-b-4 border-double border-b-ink pb-10">
        <p className="label-mono text-[13px] text-muted">DOCUMENT · PDF</p>
        <h1 className="head-cond max-w-[22ch] text-[clamp(2.25rem,6vw,4rem)] leading-[1]">
          {doc.title}
        </h1>
        <p className="max-w-3xl text-lg leading-[1.55] text-ink-soft sm:text-xl">{doc.subtitle}</p>
      </header>

      <div className="mx-auto mt-10 max-w-4xl">
        <PdfViewer url={doc.file} title={doc.title} />
      </div>
    </main>
  )
}
