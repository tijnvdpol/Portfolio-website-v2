import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import DossierRow from '../components/dossier/DossierRow'
import PageIntro from '../components/dossier/PageIntro'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import SeoHead from '../components/SeoHead'
import TagFilter from '../components/TagFilter'
import { useDossiers } from '../hooks/useDossiers'

// Alle dossiers, in dezelfde opbouw als de uitgelichte dossiers op de homepage.
export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTag = searchParams.get('tag')

  const { data: dossiers, loading, error } = useDossiers()

  const tags = useMemo(
    () =>
      Array.from(new Set((dossiers ?? []).flatMap((dossier) => dossier.tags))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [dossiers],
  )
  const visible = useMemo(
    () => (dossiers ?? []).filter((dossier) => !activeTag || dossier.tags.includes(activeTag)),
    [dossiers, activeTag],
  )

  function handleSelectTag(tag: string | null) {
    if (tag) {
      setSearchParams({ tag })
    } else {
      setSearchParams({})
    }
  }

  return (
    <main className="px-4 pt-10 pb-24 md:px-10 lg:pt-16 xl:px-20">
      <SeoHead
        title="Dossiers — Tijn van der Pol"
        description="Alle dossiers van Tijn van der Pol: webapplicaties, AI-tools en onderzoek op het snijvlak van finance en AI, elk met bewijslast."
      />

      <PageIntro label="2000 · DOSSIERS" title="Alle dossiers, met bewijslast.">
        <p className="max-w-[640px] text-lg leading-[1.55] text-ink-soft sm:text-xl">
          Webapplicaties, AI-tools en onderzoek op het snijvlak van finance en AI. Bij elk project
          vind je de bewijslast: een live demo, de broncode of het volledige rapport.
        </p>
      </PageIntro>

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-8 pb-8">
        {tags.length > 0 ? (
          <TagFilter tags={tags} activeTag={activeTag} onSelect={handleSelectTag} />
        ) : (
          <span />
        )}
        {dossiers ? (
          <p className="label-mono text-xs text-muted" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'dossier' : 'dossiers'}
          </p>
        ) : null}
      </div>

      {loading ? <LoadingState label="Dossiers laden…" /> : null}
      {error ? <ErrorState message={error} /> : null}

      {dossiers && visible.length === 0 ? (
        <p className="border-t border-ink pt-6 text-muted">
          Geen projecten gevonden voor deze filter.
        </p>
      ) : null}

      {visible.length > 0 ? (
        <div>
          {visible.map((dossier, index) => (
            <DossierRow
              key={dossier.id}
              dossier={dossier}
              isFirst={index === 0}
              isLast={index === visible.length - 1}
            />
          ))}
        </div>
      ) : null}
    </main>
  )
}
