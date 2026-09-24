import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink-soft prose-a:text-accent prose-a:underline-offset-4 hover:prose-a:text-accent-strong prose-strong:text-ink prose-blockquote:border-accent prose-li:marker:text-accent">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
