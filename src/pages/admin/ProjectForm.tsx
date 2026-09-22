import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
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
import { slugify } from '../../lib/slug'
import { deleteFile, storagePathFromUrl, uploadFile } from '../../lib/storage'
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
      <main className="mx-auto max-w-3xl px-4 py-10">
        <LoadingState />
      </main>
    )
  }

  if (loadError) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <ErrorState message={loadError} />
      </main>
    )
  }

  if (notFound) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-slate-600">Project niet gevonden.</p>
        <Link to="/admin" className="mt-2 inline-block text-sm text-slate-500 hover:text-slate-900">
          ← Terug naar overzicht
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <SeoHead
        title={isEditing ? 'Project bewerken — Beheer' : 'Nieuw project — Beheer'}
        description="Project aanmaken of bewerken."
        noIndex
      />

      <Link to="/admin" className="text-sm text-slate-500 hover:text-slate-900">
        ← Terug naar overzicht
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">
        {isEditing ? 'Project bewerken' : 'Nieuw project'}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6" noValidate>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Titel
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-slate-700">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            required
            value={slug}
            onChange={(event) => handleSlugChange(event.target.value)}
            onBlur={handleSlugBlur}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm focus:border-slate-900 focus:outline-none"
          />
          <p className="mt-1 text-xs text-slate-400">
            Onderdeel van de URL: /projecten/{slug || '…'}
          </p>
          {slugWarning ? <p className="mt-1 text-xs text-red-600">{slugWarning}</p> : null}
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-slate-700">
            Samenvatting
          </label>
          <textarea
            id="summary"
            required
            rows={2}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className="mt-1 w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700">
            Inhoud (markdown)
          </label>
          <div className="mt-1">
            <MarkdownEditor id="content" value={content} onChange={setContent} />
          </div>
        </div>

        <div>
          <label htmlFor="cover" className="block text-sm font-medium text-slate-700">
            Coverafbeelding
          </label>
          {coverImageUrl ? (
            <div className="mt-2 flex items-center gap-3">
              <img
                src={coverImageUrl}
                alt=""
                className="h-20 w-32 rounded-md border border-slate-200 object-cover"
              />
              <button
                type="button"
                onClick={() => setCoverImageUrl(null)}
                className="text-sm text-slate-500 underline underline-offset-4 hover:text-slate-900"
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
            className="mt-2 text-sm text-slate-600"
          />
          {coverUploading ? <p className="mt-1 text-xs text-slate-400">Bezig met uploaden…</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-slate-700">
              Tags
            </label>
            <div className="mt-1">
              <TagsInput id="tags" value={tags} onChange={setTags} />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">
              Categorie
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Bijv. Overnameanalyse"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="project_date" className="block text-sm font-medium text-slate-700">
              Datum
            </label>
            <input
              id="project_date"
              type="date"
              value={projectDate}
              onChange={(event) => setProjectDate(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="sort_order" className="block text-sm font-medium text-slate-700">
              Volgorde
            </label>
            <input
              id="sort_order"
              type="number"
              value={sortOrder}
              onChange={(event) => setSortOrder(Number(event.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            />
            <p className="mt-1 text-xs text-slate-400">Laag getal wordt eerst getoond.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            Uitgelicht op home
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) => setPublished(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            Gepubliceerd (zichtbaar voor bezoekers)
          </label>
        </div>

        <div>
          <p className="block text-sm font-medium text-slate-700">Bijlagen</p>

          {attachments.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {attachments.map((attachment) => (
                <li key={attachment.id} className="flex items-center justify-between gap-3 text-sm">
                  <a
                    href={attachment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 underline underline-offset-4 hover:text-slate-900"
                  >
                    {attachment.file_name}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDeleteAttachment(attachment)}
                    className="text-red-600 hover:underline"
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
                className="mt-3 text-sm text-slate-600"
              />
              {attachmentUploading ? (
                <p className="mt-1 text-xs text-slate-400">Bezig met uploaden…</p>
              ) : null}
            </>
          ) : (
            <p className="mt-2 text-xs text-slate-400">
              Sla het project eerst op om bijlagen toe te voegen.
            </p>
          )}
        </div>

        {formError ? (
          <p role="alert" className="text-sm text-red-600">
            {formError}
          </p>
        ) : null}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Bezig met opslaan…' : 'Opslaan'}
          </button>
          <Link to="/admin" className="text-sm text-slate-500 hover:text-slate-900">
            Annuleren
          </Link>
        </div>
      </form>
    </main>
  )
}
