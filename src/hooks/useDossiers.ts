import { useEffect, useState } from 'react'
import { listDossiers, type Dossier } from '../lib/dossiers'

type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export function useDossiers() {
  const [state, setState] = useState<AsyncState<Dossier[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    listDossiers()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
