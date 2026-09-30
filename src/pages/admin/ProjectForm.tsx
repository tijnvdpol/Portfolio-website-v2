import { type ChangeEvent, type FormEvent, type KeyboardEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MarkdownEditor from '../../components/admin/MarkdownEditor'
import TagsInput from '../../components/admin/TagsInput'
import ErrorState from '../../components/ErrorState'
import LoadingState from '../../components/LoadingState'
import SeoHead from '../../components/SeoHead'
import {
  addAttachment,
  createProject,
  deleteAttachment,
  getProjectById,
  isSlugTaken,
  updateProject,
} from '../../lib/adminProjects'
import { EVIDENCE_TYPES, evidenceLabel, evidenceType, isInternalUrl } from '../../lib/evidence'
import { slugify } from '../../lib/slug'
import { deleteFile, storagePathFromUrl, uploadFile } from '../../lib/storage'
import { buttonPrimary, buttonSecondary, inputField } from '../../lib/styles'
import type { ProjectAttachment, ProjectInsert } from '../../types/database.types'

export default function AdminProjectForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugEditedManually, setSlugEditedManually] = useState(false)
  const [slugWarning, setSlugWarning] = useState<string | null>(null)
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [category, setCategory] = useState('')
  const [projectDate, setProjectDate] = useState('')
  const [featured, setFeatured] = useState(false)
  const [published, setPublished] = useState(false)
  const [sortOrder, setSortOrder] = useState(0)
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
  const [coverUploading, setCoverUploading] = useState(false)
  const [attachments, setAttachments] = useState<ProjectAttachment[]>([])
  const [attachmentUploading, setAttachmentUploading] = useState(false)
  const [linkType, setLinkType] = useState<keyof typeof EVIDENCE_TYPES>('demo')
  const [linkLabel, setLinkLabel] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkSaving, setLinkSaving] = useState(false)

  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    getProjectById(id)
      .then((project) => {
        if (cancelled) return
        if (!project) {
          setNotFound(true)
          setLoading(false)
          return
        }
        setTitle(project.title)
        setSlug(project.slug)
        setSlugEditedManually(true)
        setSummary(project.summary)
        setContent(project.content)
        setTags(project.tags)
        setCategory(project.category ?? '')
        setProjectDate(project.project_date ?? '')
        setFeatured(project.featured)
        setPublished(project.published)
        setSortOrder(project.sort_order)
        setCoverImageUrl(project.cover_image_url)
        setAttachments(project.project_attachments)
        setLoading(false)
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setLoadError(err.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [id])

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugEditedManually) {
      setSlug(slugify(value))
    }
  }

  function handleSlugChange(value: string) {
    setSlugEditedManually(true)
    setSlug(slugify(value))
    setSlugWarning(null)
  }

  async function handleSlugBlur() {
    if (!slug) return
    try {
      const taken = await isSlugTaken(slug, id)
      setSlugWarning(taken ? 'Deze slug is al in gebruik door een ander project.' : null)
    } catch {
      // Stille fout: de uiteindelijke check bij opslaan vangt dit alsnog af.
    }
  }

  async function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setCoverUploading(true)
    setFormError(null)
    try {
      const ext = file.name.includes('.') ? file.name.split('.').pop() : 'jpg'
      const path = `covers/${crypto.randomUUID()}.${ext}`
      const url = await uploadFile(path, file)
      setCoverImageUrl(url)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Upload van coverafbeelding mislukt.')
    } finally {
      setCoverUploading(false)
      event.target.value = ''
    }
  }

  async function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0 || !id) return

    setAttachmentUploading(true)
    setFormError(null)
    try {
      for (const file of Array.from(files)) {
        const path = `attachments/${id}/${crypto.randomUUID()}-${file.name}`
        const url = await uploadFile(path, file)
        const attachment = await addAttachment(id, {
          file_name: file.name,
          file_url: url,
          file_type: file.type || null,
        })
        setAttachments((prev) => [...prev, attachment])
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Upload van bijlage mislukt.')
    } finally {
      setAttachmentUploading(false)
      event.target.value = ''
    }
  }

  async function handleAddLink() {
    if (!id) return
    const url = linkUrl.trim()
    const label = linkLabel.trim()
    if (!label || !url) {
      setFormError('Vul een omschrijving en een URL in voor de link.')
      return
    }
    if (!/^https?:\/\//.test(url) && !isInternalUrl(url)) {
      setFormError('Een link begint met https:// of, voor een pagina op deze site, met /.')
      return
    }

    setLinkSaving(true)
    setFormError(null)
    try {
      const attachment = await addAttachment(id, {
        file_name: label,
        file_url: url,
        file_type: linkType,
      })
      setAttachments((prev) => [...prev, attachment])
      setLinkLabel('')
      setLinkUrl('')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Link toevoegen mislukt.')
    } finally {
      setLinkSaving(false)
    }
  }

  function handleLinkKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    // Enter zou anders het hele projectformulier versturen.
    if (event.key === 'Enter') {
      event.preventDefault()
      void handleAddLink()
    }
  }

  async function handleDeleteAttachment(attachment: ProjectAttachment) {
    if (!window.confirm(`Bijlage "${attachment.file_name}" verwijderen?`)) return

    try {
      await deleteAttachment(attachment.id)
      const path = storagePathFromUrl(attachment.file_url)
      if (path) await deleteFile(path).catch(() => {})
      setAttachments((prev) => prev.filter((a) => a.id !== attachment.id))
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Verwijderen van bijlage mislukt.')
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)

    if (!title.trim() || !summary.trim() || !slug.trim()) {
      setFormError('Titel, samenvatting en slug zijn verplicht.')
      return
    }

    setSaving(true)
    try {
      const taken = await isSlugTaken(slug, id)
      if (taken) {
        setSlugWarning('Deze slug is al in gebruik door een ander project.')
        setFormError('Kies een unieke slug voordat je opslaat.')
        setSaving(false)
        return
      }

      const payload: ProjectInsert = {
        title: title.trim(),
        slug,
        summary: summary.trim(),
        content,
        cover_image_url: coverImageUrl,
        tags,
        category: category.trim() || null,
        project_date: projectDate || null,
        featured,
        published,
        sort_order: sortOrder,
      }

      if (id) {
        await updateProject(id, payload)
        navigate('/admin', { replace: true })
      } else {
        const created = await createProject(payload)
        navigate(`/admin/projecten/${created.id}/bewerken`, { replace: true })
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Opslaan is mislukt.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 pt-10 pb-24 md:px-10">
        <LoadingState />
      </main>
    )
  }

  if (loadError) {
    return (
      <main className="mx-auto max-w-4xl px-4 pt-10 pb-24 md:px-10">
        <ErrorState message={loadError} />
      </main>
    )
  }

  if (notFound) {
    return (
      <main className="mx-auto max-w-4xl px-4 pt-10 pb-24 md:px-10">
        <p className="text-ink-soft">Project niet gevonden.</p>
        <Link to="/admin" className="mt-2 inline-block text-sm font-semibold link-double">
          ← Terug naar overzicht
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pt-10 pb-24 md:px-10">
      <SeoHead
        title={isEditing ? 'Project bewerken — Beheer' : 'Nieuw project — Beheer'}
        description="Project aanmaken of bewerken."
        noIndex
      />

      <Link to="/admin" className="text-sm font-semibold link-double">
        ← Terug naar overzicht
      </Link>

      <h1 className="head-cond mt-6 text-[clamp(2.25rem,6vw,3.5rem)] leading-none">
        {isEditing ? 'Project bewerken' : 'Nieuw project'}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6" noValidate>
        <div>
          <label htmlFor="title" className="label-mono block text-[11px] text-muted">
            Titel
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className={`mt-1 ${inputField}`}
          />
        </div>

        <div>
          <label htmlFor="slug" className="label-mono block text-[11px] text-muted">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            required
            value={slug}
            onChange={(event) => handleSlugChange(event.target.value)}
            onBlur={handleSlugBlur}
            className={`mt-1 font-mono ${inputField}`}
          />
          <p className="mt-1 text-xs text-muted">
            Onderdeel van de URL: /projecten/{slug || '…'}
          </p>
          {slugWarning ? <p className="mt-1 text-xs text-danger">{slugWarning}</p> : null}
        </div>

        <div>
          <label htmlFor="summary" className="label-mono block text-[11px] text-muted">
            Samenvatting
          </label>
          <textarea
            id="summary"
            required
            rows={2}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className={`mt-1 resize-y ${inputField}`}
          />
        </div>

        <div>
          <label htmlFor="content" className="label-mono block text-[11px] text-muted">
            Inhoud (markdown)
          </label>
          <div className="mt-1">
            <MarkdownEditor id="content" value={content} onChange={setContent} />
          </div>
        </div>

        <div>
          <label htmlFor="cover" className="label-mono block text-[11px] text-muted">
            Coverafbeelding
          </label>
          {coverImageUrl ? (
            <div className="mt-2 flex items-center gap-3">
              <img
                src={coverImageUrl}
                alt=""
                className="h-20 w-32 border-[1.5px] border-ink object-cover"
              />
              <button
                type="button"
                onClick={() => setCoverImageUrl(null)}
                className="text-sm font-semibold link-double"
              >
                Verwijderen
              </button>
            </div>
          ) : null}
          <input
            id="cover"
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            disabled={coverUploading}
            className="mt-2 text-sm text-ink-soft"
          />
          {coverUploading ? <p className="mt-1 text-xs text-muted">Bezig met uploaden…</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="tags" className="label-mono block text-[11px] text-muted">
              Tags
            </label>
            <div className="mt-1">
              <TagsInput id="tags" value={tags} onChange={setTags} />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="label-mono block text-[11px] text-muted">
              Categorie
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Bijv. Webapplicatie"
              className={`mt-1 ${inputField}`}
            />
          </div>

          <div>
            <label htmlFor="project_date" className="label-mono block text-[11px] text-muted">
              Datum
            </label>
            <input
              id="project_date"
              type="date"
              value={projectDate}
              onChange={(event) => setProjectDate(event.target.value)}
              className={`mt-1 ${inputField}`}
            />
          </div>

          <div>
            <label htmlFor="sort_order" className="label-mono block text-[11px] text-muted">
              Volgorde
            </label>
            <input
              id="sort_order"
              type="number"
              value={sortOrder}
              onChange={(event) => setSortOrder(Number(event.target.value))}
              className={`mt-1 ${inputField}`}
            />
            <p className="mt-1 text-xs text-muted">Laag getal wordt eerst getoond.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="size-4 accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            Uitgelicht op home
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) => setPublished(event.target.checked)}
              className="size-4 accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            Gepubliceerd (zichtbaar voor bezoekers)
          </label>
        </div>

        <div>
          <p className="label-mono block text-[11px] text-muted">Bewijslast en bijlagen</p>
          <p className="mt-1 text-xs text-muted">
            Upload bestanden of voeg links toe (live demo, GitHub, rapport). Ze verschijnen als
            bewijslast op de projectpagina.
          </p>

          {attachments.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {attachments.map((attachment) => (
                <li key={attachment.id} className="flex items-center justify-between gap-3 text-sm">
                  <a
                    href={attachment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold link-double"
                  >
                    <span className="label-mono mr-2 text-[11px] font-normal text-muted">
                      {evidenceLabel(evidenceType(attachment.file_type))}
                    </span>
                    {attachment.file_name}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDeleteAttachment(attachment)}
                    className="text-danger hover:underline"
                  >
                    Verwijderen
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          {isEditing ? (
            <>
              <input
                type="file"
                multiple
                onChange={handleAttachmentChange}
                disabled={attachmentUploading}
                className="mt-3 text-sm text-ink-soft"
              />
              {attachmentUploading ? (
                <p className="mt-1 text-xs text-muted">Bezig met uploaden…</p>
              ) : null}

              <fieldset className="mt-4 border border-rule-strong p-3">
                <legend className="label-mono px-1 text-[11px] text-muted">Link toevoegen</legend>
                <div className="grid gap-2 sm:grid-cols-[10rem_1fr]">
                  <select
                    aria-label="Soort link"
                    value={linkType}
                    onChange={(event) =>
                      setLinkType(event.target.value as keyof typeof EVIDENCE_TYPES)
                    }
                    className={inputField}
                  >
                    {Object.entries(EVIDENCE_TYPES).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <input
                    aria-label="Omschrijving"
                    placeholder="Omschrijving, bijv. Broncode op GitHub"
                    value={linkLabel}
                    onChange={(event) => setLinkLabel(event.target.value)}
                    onKeyDown={handleLinkKeyDown}
                    className={inputField}
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    aria-label="URL"
                    placeholder="https://… of /rapporten/…"
                    value={linkUrl}
                    onChange={(event) => setLinkUrl(event.target.value)}
                    onKeyDown={handleLinkKeyDown}
                    className={inputField}
                  />
                  <button
                    type="button"
                    onClick={handleAddLink}
                    disabled={linkSaving}
                    className={`${buttonSecondary} shrink-0`}
                  >
                    {linkSaving ? 'Bezig…' : 'Toevoegen'}
                  </button>
                </div>
              </fieldset>
            </>
          ) : (
            <p className="mt-2 text-xs text-muted">
              Sla het project eerst op om bijlagen toe te voegen.
            </p>
          )}
        </div>

        {formError ? (
          <p role="alert" className="text-sm text-danger">
            {formError}
          </p>
        ) : null}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className={buttonPrimary}>
            {saving ? 'Bezig met opslaan…' : 'Opslaan'}
          </button>
          <Link to="/admin" className="text-sm font-semibold link-double">
            Annuleren
          </Link>
        </div>
      </form>
    </main>
  )
}
