import { Children, isValidElement, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { isInternalUrl } from '../lib/evidence'
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
    if (href && isInternalUrl(href)) return <Link to={href}>{children}</Link>
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

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-stone max-w-none break-words prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink-soft prose-a:text-accent prose-a:underline-offset-4 hover:prose-a:text-accent-strong prose-strong:text-ink prose-blockquote:border-accent prose-li:marker:text-accent">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
