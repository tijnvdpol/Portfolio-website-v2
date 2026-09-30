import { useEffect, useRef, useState } from 'react'
import * as pdfjs from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import ErrorState from './ErrorState'
import LoadingState from './LoadingState'

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

// Tekent elke pagina van een pdf als canvas, op de breedte van de container. Hertekent bij een
// andere breedte (bijv. telefoon draaien). Wordt alleen geladen op de readerpagina.
export default function PdfViewer({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [doc, setDoc] = useState<pdfjs.PDFDocumentProxy | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 1. Document laden.
  useEffect(() => {
    let cancelled = false
    const task = pdfjs.getDocument({ url })
    task.promise
      .then((loaded) => {
        if (!cancelled) setDoc(loaded)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Pdf laden mislukt.')
      })
    return () => {
      cancelled = true
      void task.destroy()
    }
  }, [url])

  // 2. Tekenen zodra de canvassen bestaan (na het laden), en opnieuw bij een andere breedte.
  // Een canvas kan maar één render tegelijk aan: daarom wachten rondes op elkaar en wordt een
  // lopende ronde afgebroken voordat een nieuwe begint.
  useEffect(() => {
    const container = containerRef.current
    if (!doc || !container) return
    const pdf = doc
    const root = container
    let disposed = false
    let generation = 0
    let lastWidth = 0
    let current: pdfjs.RenderTask | null = null
    let queue: Promise<void> = Promise.resolve()

    async function draw(round: number) {
      const width = root.clientWidth
      lastWidth = width
      const ratio = window.devicePixelRatio || 1
      const canvases = root.querySelectorAll('canvas')
      for (let n = 1; n <= pdf.numPages; n++) {
        if (disposed || round !== generation) return
        const page = await pdf.getPage(n)
        const canvas = canvases[n - 1]
        if (!canvas || disposed || round !== generation) return
        const base = page.getViewport({ scale: 1 })
        const viewport = page.getViewport({ scale: (width / base.width) * ratio })
        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        current = page.render({ canvas, viewport })
        try {
          await current.promise
        } catch (err) {
          // Een afgebroken ronde is geen fout.
          if (err instanceof pdfjs.RenderingCancelledException) return
          throw err
        }
      }
    }

    function schedule() {
      const round = ++generation
      current?.cancel()
      queue = queue.then(() => draw(round)).catch(() => {})
    }

    schedule()
    const observer = new ResizeObserver(() => {
      if (Math.abs(root.clientWidth - lastWidth) > 8) schedule()
    })
    observer.observe(root)

    return () => {
      disposed = true
      observer.disconnect()
      current?.cancel()
    }
  }, [doc])

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      {!doc && !error ? <LoadingState label="Document laden…" /> : null}
      {error ? <ErrorState message={error} /> : null}
      {doc
        ? Array.from({ length: doc.numPages }, (_, index) => (
            <canvas
              key={index}
              role="img"
              aria-label={`${title}, pagina ${index + 1} van ${doc.numPages}`}
              className="block h-auto w-full border-[1.5px] border-ink bg-white shadow-[0_1px_2px_rgba(21,23,26,0.12),0_10px_24px_rgba(21,23,26,0.08)]"
            />
          ))
        : null}
    </div>
  )
}
