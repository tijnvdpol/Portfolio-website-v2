import { useEffect, useState } from 'react'
import { listDossiers, type Dossier } from '../lib/dossiers'

type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

// `featuredOnly`: alleen de uitgelichte dossiers (homepage). Standaard alle gepubliceerde.
export function useDossiers({ featuredOnly = false }: { featuredOnly?: boolean } = {}) {
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

  const data = state.data && featuredOnly ? state.data.filter((d) => d.featured) : state.data
  return { ...state, data }
}
