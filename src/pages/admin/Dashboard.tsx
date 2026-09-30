import { useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorState from '../../components/ErrorState'
import PageIntro from '../../components/dossier/PageIntro'
import LoadingState from '../../components/LoadingState'
import SeoHead from '../../components/SeoHead'
import { useAdminProjects } from '../../hooks/useAdminProjects'
import { useAuth } from '../../hooks/useAuth'
import { deleteProject } from '../../lib/adminProjects'
import { formatProjectDate } from '../../lib/format'
import { deleteFile, storagePathFromUrl } from '../../lib/storage'
import { buttonPrimary, focusRing } from '../../lib/styles'
import type { Project } from '../../types/database.types'

const columns = ['Titel', 'Status', 'Uitgelicht', 'Datum']

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
    <main className="px-4 pt-10 pb-24 md:px-10 lg:pt-16 xl:px-20">
      <SeoHead title="Beheer — projecten" description="Beheer je portfolio-projecten." noIndex />

      <PageIntro label="BEHEER · DOSSIERS" title="Projecten beheren.">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {session?.user.email ? (
            <p className="font-mono text-xs text-muted">Ingelogd als {session.user.email}</p>
          ) : (
            <span />
          )}
          <Link to="/admin/projecten/nieuw" className={buttonPrimary}>
            Nieuw project
          </Link>
        </div>
      </PageIntro>

      {loading ? <LoadingState /> : null}
      {error ? <ErrorState message={error} /> : null}
      {deleteError ? <ErrorState message={deleteError} /> : null}

      {projects && projects.length === 0 ? (
        <p className="mt-8 border-t border-ink pt-6 text-muted">
          Nog geen projecten. Maak je eerste project aan.
        </p>
      ) : null}

      {projects && projects.length > 0 ? (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[15px]">
            <caption className="sr-only">Overzicht van alle projecten met status</caption>
            <thead>
              <tr className="border-y border-ink">
                {columns.map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className="label-mono py-2.5 pr-4 text-[11px] font-normal text-muted"
                  >
                    {label}
                  </th>
                ))}
                <th scope="col" className="py-2.5">
                  <span className="sr-only">Acties</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-line">
                  <td className="py-3.5 pr-4 font-semibold">{project.title}</td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`border px-2 py-[3px] font-mono text-xs ${
                        project.published
                          ? 'border-accent text-accent'
                          : 'border-signal text-signal'
                      }`}
                    >
                      {project.published ? 'Gepubliceerd' : 'Concept'}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-muted">{project.featured ? 'Ja' : '—'}</td>
                  <td className="py-3.5 pr-4 font-mono text-xs text-muted">
                    {formatProjectDate(project.project_date) ?? '—'}
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex justify-end gap-5">
                      <Link
                        to={`/admin/projecten/${project.id}/bewerken`}
                        className={`font-semibold link-double ${focusRing}`}
                      >
                        Bewerken
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        disabled={deletingId === project.id}
                        className={`font-semibold text-danger link-double disabled:opacity-50 ${focusRing}`}
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
