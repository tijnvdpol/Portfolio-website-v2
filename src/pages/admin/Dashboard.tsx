import { useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorState from '../../components/ErrorState'
import LoadingState from '../../components/LoadingState'
import SeoHead from '../../components/SeoHead'
import { useAdminProjects } from '../../hooks/useAdminProjects'
import { useAuth } from '../../hooks/useAuth'
import { signOut } from '../../lib/auth'
import { deleteProject } from '../../lib/adminProjects'
import { formatProjectDate } from '../../lib/format'
import { deleteFile, storagePathFromUrl } from '../../lib/storage'
import { buttonPrimary, buttonSecondary } from '../../lib/styles'
import type { Project } from '../../types/database.types'

export default function AdminDashboard() {
  const { data: projects, loading, error, refetch } = useAdminProjects()
  const { session } = useAuth()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function handleDelete(project: Project) {
    if (!window.confirm(`Project "${project.title}" definitief verwijderen?`)) return

    setDeleteError(null)
    setDeletingId(project.id)
    try {
      await deleteProject(project.id)
      if (project.cover_image_url) {
        const path = storagePathFromUrl(project.cover_image_url)
        if (path) await deleteFile(path).catch(() => {})
      }
      await refetch()
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Verwijderen is mislukt.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <SeoHead
        title="Beheer — projecten"
        description="Beheer je portfolio-projecten."
        noIndex
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Projecten beheren</h1>
          {session?.user.email ? (
            <p className="mt-1 text-sm text-slate-500">Ingelogd als {session.user.email}</p>
          ) : null}
        </div>
        <div className="flex gap-3">
          <Link to="/admin/projecten/nieuw" className={buttonPrimary}>
            Nieuw project
          </Link>
          <button type="button" onClick={() => signOut()} className={buttonSecondary}>
            Uitloggen
          </button>
        </div>
      </div>

      {loading ? <LoadingState /> : null}
      {error ? <ErrorState message={error} /> : null}
      {deleteError ? <ErrorState message={deleteError} /> : null}

      {projects && projects.length === 0 ? (
        <p className="mt-8 text-slate-500">Nog geen projecten. Maak je eerste project aan.</p>
      ) : null}

      {projects && projects.length > 0 ? (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Overzicht van alle projecten met status</caption>
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th scope="col" className="py-2 pr-4 font-medium">
                  Titel
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Status
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Uitgelicht
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Datum
                </th>
                <th scope="col" className="py-2 font-medium">
                  <span className="sr-only">Acties</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-900">{project.title}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        project.published
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {project.published ? 'Gepubliceerd' : 'Concept'}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-500">{project.featured ? 'Ja' : '—'}</td>
                  <td className="py-3 pr-4 text-slate-500">
                    {formatProjectDate(project.project_date) ?? '—'}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        to={`/admin/projecten/${project.id}/bewerken`}
                        className="text-slate-700 underline underline-offset-4 hover:text-slate-900"
                      >
                        Bewerken
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        disabled={deletingId === project.id}
                        className="text-red-600 underline underline-offset-4 hover:text-red-700 disabled:opacity-50"
                      >
                        {deletingId === project.id ? 'Bezig…' : 'Verwijderen'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  )
}
