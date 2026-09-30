import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Nieuwe pagina: terug naar boven. Link met #anker (bijv. /#dossiers vanaf een subpagina):
// naar dat anker scrollen. De pagina kan nog laden, dus de sprong wordt kort herhaald.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const timers = [0, 300, 900].map((delay) =>
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), delay),
    )
    return () => timers.forEach(window.clearTimeout)
  }, [pathname, hash])

  return null
}
