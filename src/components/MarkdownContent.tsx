import { Children, isValidElement, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { isRouteUrl } from '../lib/evidence'
import { slugify } from '../lib/slug'

function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child)
      if (isValidElement<{ children?: ReactNode }>(child)) return textOf(child.props.children)
      return ''
    })
    .join('')
}

// h2's krijgen een id zodat een inhoudsopgave ernaar kan linken; interne links gaan via de router.
const components: Components = {
  a: ({ href, children }) => {
    if (href && isRouteUrl(href)) return <Link to={href}>{children}</Link>
    if (href?.startsWith('#')) return <a href={href}>{children}</a>
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  },
  h2: ({ children }) => (
    <h2 id={slugify(textOf(children))} className="scroll-mt-24">
      {children}
    </h2>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
}

// Koppen in Archivo (smal en zwaar) en code in Plex Mono, zoals de rest van de site.
const proseClass = [
  'prose prose-stone max-w-none break-words',
  'prose-headings:font-head prose-headings:font-extrabold prose-headings:[font-stretch:75%] prose-headings:tracking-normal prose-headings:text-ink',
  'prose-h2:border-t prose-h2:border-ink prose-h2:pt-6',
  'prose-p:text-ink-soft prose-li:text-ink-soft prose-li:marker:text-accent',
  'prose-a:text-accent prose-a:underline-offset-4 hover:prose-a:text-accent-strong',
  'prose-strong:text-ink prose-blockquote:border-accent prose-blockquote:font-medium prose-blockquote:not-italic',
  'prose-code:font-mono prose-code:font-normal prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-th:tracking-wider',
  'prose-hr:border-ink',
].join(' ')

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className={proseClass}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
