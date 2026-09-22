import { useCallback, useEffect, useState } from 'react'
import { listAllProjects } from '../lib/adminProjects'
import type { Project } from '../types/database.types'

export function useAdminProjects() {
  const [data, setData] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)

    return listAllProjects()
      .then((rows) => {
        setData(rows)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let cancelled = false

    listAllProjects()
      .then((rows) => {
        if (!cancelled) {
          setData(rows)
          setLoading(false)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error, refetch }
}
