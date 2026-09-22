import { useEffect, useState } from 'react'
import { listAllTags, listFeaturedProjects, listPublishedProjects } from '../lib/projects'
import type { Project } from '../types/database.types'

type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export function useProjects(tag?: string) {
  const [state, setState] = useState<AsyncState<Project[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState({ data: null, loading: true, error: null })

    listPublishedProjects({ tag })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message })
      })

    return () => {
      cancelled = true
    }
  }, [tag])

  return state
}

export function useFeaturedProjects() {
  const [state, setState] = useState<AsyncState<Project[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    listFeaturedProjects()
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

export function useTags() {
  const [state, setState] = useState<AsyncState<string[]>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    listAllTags()
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
