import { home } from '../../data/home'
import { lastChanged } from '../../lib/format'
import { focusRing } from '../../lib/styles'

const copy = home.contact

// Contact en voetregel ("einde dossier"). Sluit de pagina af met een dubbele lijn.
export default function Contact() {
  return (
    <footer
      id="contact"
      className="anchor-offset flex flex-col gap-16 border-t-4 border-double border-t-ink px-4 pt-16 pb-10 md:px-10 lg:pt-24 xl:px-20"
    >
      <div className="grid items-end gap-10 lg:grid-cols-[7fr_5fr] lg:gap-x-[72px]">
        <div className="flex flex-col gap-3.5">
          <p className="label-mono text-[13px] text-muted">{copy.label}</p>
          <h2 className="head-cond text-[clamp(2.75rem,8vw,4.75rem)] leading-[0.98]">
            {copy.title}
          </h2>
        </div>

        <ul className="flex flex-col">
          {copy.links.map((link, index) => {
            const external = link.href.startsWith('http')
            return (
              <li
                key={link.label}
                className={`border-t border-ink ${index === copy.links.length - 1 ? 'border-b' : ''}`}
              >
                <a
                  href={link.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`flex items-center justify-between gap-4 py-[18px] text-lg font-semibold link-double sm:text-xl ${focusRing}`}
                >
                  <span className="min-w-0">
                    <span className="label-mono block text-[11px] font-normal text-muted">
                      {link.label}
                    </span>
                    <span className="break-words">{link.value}</span>
                  </span>
                  <span aria-hidden="true">{external ? '↗' : '→'}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-col justify-between gap-2 font-mono text-xs tracking-[0.04em] text-muted sm:flex-row">
        <p>{copy.colophon}</p>
        <p>
          {copy.end} {lastChanged()}
        </p>
      </div>
    </footer>
  )
}
