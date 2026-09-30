import { type FormEvent, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import SeoHead from '../../components/SeoHead'
import { useAuth } from '../../hooks/useAuth'
import { signInWithPassword } from '../../lib/auth'
import { buttonPrimary, inputField } from '../../lib/styles'

type LocationState = { from?: { pathname: string } }

export default function AdminLogin() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) {
    const from = (location.state as LocationState | null)?.from?.pathname ?? '/admin'
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await signInWithPassword(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Inloggen is mislukt.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-4 pt-16 pb-24 lg:pt-24">
      <SeoHead title="Inloggen — Beheer" description="Inloggen in de beheeromgeving." noIndex />

      <div className="flex flex-col gap-3.5">
        <p className="label-mono text-[13px] text-muted">BEHEER · TOEGANG</p>
        <h1 className="head-cond text-[clamp(2.5rem,8vw,3.75rem)] leading-none">Inloggen.</h1>
        <p className="text-base text-ink-soft">Beheeromgeving voor portfolioprojecten.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 border-[1.5px] border-ink bg-card p-6"
        noValidate
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="label-mono text-[11px] text-muted">
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputField}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="label-mono text-[11px] text-muted">
            Wachtwoord
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputField}
          />
        </div>

        {error ? (
          <p
            role="alert"
            className="border-[1.5px] border-danger bg-danger-bg px-3 py-2 font-mono text-sm text-danger"
          >
            {error}
          </p>
        ) : null}

        <button type="submit" disabled={submitting} className={buttonPrimary}>
          {submitting ? 'Bezig…' : 'Inloggen'}
        </button>
      </form>
    </main>
  )
}
