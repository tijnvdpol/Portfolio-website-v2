import { about } from '../data/about'
import { focusRing } from '../lib/styles'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep/60 print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} <span className="font-display text-ink">{about.name}</span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {about.contact.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`rounded-sm transition-colors hover:text-accent ${focusRing}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
