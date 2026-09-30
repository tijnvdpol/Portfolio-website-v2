import { Link } from 'react-router-dom'
import Attachments from '../components/dossier/Attachments'
import { Paperclip } from '../components/dossier/marks'
import SeoHead from '../components/SeoHead'
import { about } from '../data/about'
import { home } from '../data/home'
import { ctaPrimary, ctaSecondary } from '../lib/styles'

const copy = home.about
const now = copy.now

const facts = [
  { label: 'Opleiding', value: about.education },
  { label: 'Locatie', value: about.location },
  { label: 'Specialisatie', value: about.specialization },
]

// Volledige Over mij-pagina. Het contactblok zit niet op de pagina zelf: de voetregel
// (Contact) staat al onder elke pagina.
export default function About() {
  const primaryContact = about.contact[0]

  return (
    <main>
      <SeoHead
        title="Over mij — Tijn van der Pol"
        description="Maak kennis met Tijn van der Pol, student Finance & Control: achtergrond, visie op finance en AI, vaardigheden en contactgegevens."
      />

      <section className="grid items-start gap-12 px-4 pt-10 pb-20 md:px-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-x-16 lg:pt-16 lg:pb-28 xl:px-20">
        <aside className="fade-up order-last flex flex-col gap-8 lg:order-first">
          <figure className="relative mt-4 w-full max-w-[300px] -rotate-1 bg-white px-3 pt-3 pb-[18px] shadow-[0_1px_2px_rgba(21,23,26,0.12),0_10px_24px_rgba(21,23,26,0.08)] lg:-rotate-2">
            <Paperclip />
            {about.photoUrl ? (
              <img
                src={about.photoUrl}
                alt={copy.photoAlt}
                width={276}
                height={345}
                className="block aspect-[4/5] w-full object-cover object-[50%_20%]"
              />
            ) : (
              <div
                className="ledger-pattern grid aspect-[4/5] w-full place-items-center"
                aria-hidden="true"
              >
                <span className="head-cond text-8xl text-accent">T</span>
              </div>
            )}
          </figure>

          <div className="flex max-w-[300px] flex-col gap-4 border-[1.5px] border-ink bg-card px-[22px] py-5">
            <dl className="flex flex-col divide-y divide-line">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-0.5 py-2.5 first:pt-0">
                  <dt className="label-mono text-[11px] text-muted">{fact.label}</dt>
                  <dd className="text-base font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="flex items-start gap-2.5 border-t border-ink pt-4 text-[15px] leading-normal text-ink-soft">
              <span
                aria-hidden="true"
                className="mt-1.5 size-2 shrink-0 rounded-full bg-accent motion-safe:animate-pulse"
              />
              {about.availability}
            </p>
          </div>

          <div className="flex max-w-[300px] flex-col gap-3 border-[1.5px] border-ink bg-card px-[22px] py-5">
            <p className="label-mono flex items-center gap-2 text-xs">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              <span>{now.title}</span>
            </p>
            <ul className="flex flex-col gap-2 text-base leading-normal">
              {now.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li className="text-muted">{now.working}</li>
            </ul>
          </div>
        </aside>

        <div className="fade-up flex min-w-0 flex-col gap-[22px] [animation-delay:80ms]">
          <p className="label-mono text-[13px] text-muted">3000 · OVER MIJ</p>
          <h1 className="head-cond max-w-[18ch] text-[clamp(2.75rem,8vw,5rem)] leading-[0.98]">
            {copy.title}
          </h1>
          <p className="label-mono text-sm text-accent">{about.role}</p>

          <div className="flex max-w-[680px] flex-col gap-5">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-[1.6] text-ink-soft sm:text-[19px]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 border-t border-ink pt-8">
            <Link to="/projecten" className={ctaPrimary}>
              Bekijk mijn projecten <span aria-hidden="true">→</span>
            </Link>
            <a href={primaryContact.href} className={ctaSecondary}>
              Neem contact op
            </a>
          </div>
        </div>
      </section>

      <div className="border-t border-ink px-4 py-20 md:px-10 lg:py-24 xl:px-20">
        <Attachments />
      </div>
    </main>
  )
}
