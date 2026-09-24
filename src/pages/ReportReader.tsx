import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import MarkdownContent from '../components/MarkdownContent'
import SeoHead from '../components/SeoHead'
import { findReport } from '../data/reports'
import { slugify } from '../lib/slug'
import { buttonSecondary, eyebrow, focusRing } from '../lib/styles'
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
    <main className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <SeoHead title={`${report.title} — Tijn van der Pol`} description={report.subtitle} />

      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          to={`/projecten/${report.projectSlug}`}
          className={`rounded-sm text-sm font-medium text-muted transition-colors hover:text-accent ${focusRing}`}
        >
          ← Terug naar het project
        </Link>
        <button type="button" onClick={() => window.print()} className={buttonSecondary}>
          Afdrukken of opslaan als PDF
        </button>
      </div>

      <header className="fade-up mt-8 border-b border-line pb-10">
        <p className={eyebrow}>Onderzoeksrapport</p>
        <h1 className="mt-3 max-w-4xl font-display text-3xl leading-tight font-medium tracking-tight text-ink sm:text-5xl">
          {report.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">{report.subtitle}</p>

        <dl className="mt-8 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Auteur', report.author],
            ['Opleiding', report.program],
            ['Datum', report.date],
            ['Versie', report.version],
          ].map(([label, value]) => (
            <div key={label} className="border-t border-line pt-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
              <dd className="mt-1 font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <aside className="lg:col-span-4 print:hidden">
          <div className="lg:sticky lg:top-24">
            {chapters.length > 0 ? (
              <nav aria-label="Inhoudsopgave" className="rounded-xl border border-line bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Inhoudsopgave
                </p>
                <ol className="mt-3 space-y-1.5 text-sm">
                  {chapters.map((chapter) => (
                    <li key={chapter}>
                      <a
                        href={`#${slugify(chapter)}`}
                        className={`block rounded-sm text-ink-soft transition-colors hover:text-accent ${focusRing}`}
                      >
                        {chapter}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
          </div>
        </aside>

        <article className="min-w-0 lg:col-span-8">
          <section className="rounded-xl border border-line bg-card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Leeswijzer</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {report.readingGuide.map((item) => (
                <div key={item.code} className="flex gap-3">
                  <dt className="w-8 shrink-0 font-semibold text-accent tabular-nums">{item.code}</dt>
                  <dd className="text-ink-soft">
                    <span className="font-medium text-ink">{item.label}:</span> {item.meaning}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">Methodologische waarschuwing.</span>{' '}
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
