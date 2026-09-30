import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import MarkdownContent from '../components/MarkdownContent'
import SeoHead from '../components/SeoHead'
import { findReport } from '../data/reports'
import { slugify } from '../lib/slug'
import { ctaSecondary, focusRing } from '../lib/styles'
import NotFound from './NotFound'

type LoadState = { slug: string; content: string } | { slug: string; error: string }

export default function ReportReader() {
  const { slug } = useParams<{ slug: string }>()
  const report = findReport(slug)
  const [loaded, setLoaded] = useState<LoadState | null>(null)

  useEffect(() => {
    if (!report) return
    let cancelled = false
    report
      .load()
      .then((content) => {
        if (!cancelled) setLoaded({ slug: report.slug, content })
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoaded({
            slug: report.slug,
            error: err instanceof Error ? err.message : 'Rapport laden mislukt.',
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [report])

  if (!report) return <NotFound />

  const current = loaded?.slug === report.slug ? loaded : null
  const content = current && 'content' in current ? current.content : null
  const chapters = content
    ? content
        .split('\n')
        .filter((line) => line.startsWith('## '))
        .map((line) => line.slice(3).trim())
    : []

  return (
    <main className="px-4 pt-10 pb-24 md:px-10 lg:pt-16 xl:px-20">
      <SeoHead title={`${report.title} — Tijn van der Pol`} description={report.subtitle} />

      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          to={`/projecten/${report.projectSlug}`}
          className={`text-base font-semibold link-double ${focusRing}`}
        >
          ← Terug naar het dossier
        </Link>
        <button type="button" onClick={() => window.print()} className={ctaSecondary}>
          Afdrukken of opslaan als PDF
        </button>
      </div>

      <header className="fade-up mt-8 flex flex-col gap-5 border-b-4 border-double border-b-ink pb-10">
        <p className="label-mono text-[13px] text-muted">ONDERZOEKSRAPPORT</p>
        <h1 className="head-cond max-w-[26ch] text-[clamp(2.25rem,6vw,4rem)] leading-[1]">
          {report.title}
        </h1>
        <p className="max-w-3xl text-lg leading-[1.55] text-ink-soft sm:text-xl">
          {report.subtitle}
        </p>

        <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Auteur', report.author],
            ['Opleiding', report.program],
            ['Datum', report.date],
            ['Versie', report.version],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 border-t border-ink pt-3">
              <dt className="label-mono text-[11px] text-muted">{label}</dt>
              <dd className="text-[15px] font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-x-16">
        <aside className="print:hidden">
          <div className="lg:sticky lg:top-24">
            {chapters.length > 0 ? (
              <nav
                aria-label="Inhoudsopgave"
                className="border-[1.5px] border-ink bg-card p-5"
              >
                <p className="label-mono text-[11px] text-muted">Inhoudsopgave</p>
                <ol className="mt-3 flex flex-col gap-2 text-[15px]">
                  {chapters.map((chapter) => (
                    <li key={chapter}>
                      <a href={`#${slugify(chapter)}`} className={`link-double ${focusRing}`}>
                        {chapter}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
          </div>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <section className="border-[1.5px] border-ink bg-card p-5">
            <h2 className="label-mono text-[11px] font-normal text-muted">Leeswijzer</h2>
            <dl className="mt-3 flex flex-col gap-2 text-[15px]">
              {report.readingGuide.map((item) => (
                <div key={item.code} className="flex gap-3">
                  <dt className="w-8 shrink-0 font-mono font-semibold text-pen">{item.code}</dt>
                  <dd className="text-ink-soft">
                    <span className="font-semibold text-ink">{item.label}:</span> {item.meaning}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-line pt-4 text-[15px] leading-[1.55] text-ink-soft">
              <span className="font-semibold text-ink">Methodologische waarschuwing.</span>{' '}
              {report.caveat}
            </p>
          </section>

          <div className="mt-10">
            {!current ? <LoadingState label="Rapport laden…" /> : null}
            {current && 'error' in current ? <ErrorState message={current.error} /> : null}
            {content ? <MarkdownContent content={content} /> : null}
          </div>
        </article>
      </div>
    </main>
  )
}
