import { Link } from 'react-router-dom'
import ErrorState from '../../components/ErrorState'
import LoadingState from '../../components/LoadingState'
import SeoHead from '../../components/SeoHead'
import { useAdminProjects } from '../../hooks/useAdminProjects'
import { useAuth } from '../../hooks/useAuth'
import { signOut } from '../../lib/auth'
import { formatProjectDate } from '../../lib/format'

export default function AdminDashboard() {
  const { data: projects, loading, error } = useAdminProjects()
  const { session } = useAuth()

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
          <Link
            to="/admin/projecten/nieuw"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Nieuw project
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400"
          >
            Uitloggen
          </button>
        </div>
      </div>

      {loading ? <LoadingState /> : null}
      {error ? <ErrorState message={error} /> : null}

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
                    <Link
                      to={`/admin/projecten/${project.id}/bewerken`}
                      className="text-slate-700 underline underline-offset-4 hover:text-slate-900"
                    >
                      Bewerken
                    </Link>
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
