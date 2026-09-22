import { useEffect, useState } from 'react'
import { getProjectBySlug, type ProjectWithAttachments } from '../lib/projects'

type AsyncState = {
  data: ProjectWithAttachments | null
  loading: boolean
  error: string | null
  notFound: boolean
}

export function useProject(slug: string | undefined) {
  const [state, setState] = useState<AsyncState>({
    data: null,
    loading: true,
    error: null,
    notFound: false,
  })

  useEffect(() => {
    if (!slug) {
      setState({ data: null, loading: false, error: null, notFound: true })
      return
    }

    let cancelled = false
    setState({ data: null, loading: true, error: null, notFound: false })

    getProjectBySlug(slug)
      .then((data) => {
        if (cancelled) return
        if (!data) {
          setState({ data: null, loading: false, error: null, notFound: true })
        } else {
          setState({ data, loading: false, error: null, notFound: false })
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message, notFound: false })
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return state
}
