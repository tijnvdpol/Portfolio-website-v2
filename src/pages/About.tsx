import { Link } from 'react-router-dom'
import SeoHead from '../components/SeoHead'
import { about } from '../data/about'
import { buttonPrimary, buttonSecondary, eyebrow, focusRing } from '../lib/styles'

const facts = [
  { label: 'Opleiding', value: about.education },
  { label: 'Locatie', value: about.location },
  { label: 'Specialisatie', value: about.specialization },
]

export default function About() {
  const primaryContact = about.contact[0]

  return (
    <main>
      <SeoHead
        title="Over mij — Tijn van der Pol"
        description="Maak kennis met Tijn van der Pol, student Finance & Control: achtergrond, visie op finance en AI, vaardigheden en contactgegevens."
      />

      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14">
        <aside className="fade-up order-last lg:order-first lg:col-span-4">
          <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-xl border border-line">
            {about.photoUrl ? (
              <img
                src={about.photoUrl}
                alt={`Profielfoto van ${about.name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="ledger-pattern grid h-full w-full place-items-center" aria-hidden="true">
                <span className="font-display text-8xl font-medium text-accent">T</span>
              </div>
            )}
          </div>

          <dl className="mt-6 max-w-xs divide-y divide-line border-y border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {fact.label}
                </dt>
                <dd className="text-right text-sm font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 flex max-w-xs items-start gap-2 text-sm text-ink-soft">
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent motion-safe:animate-pulse"
              aria-hidden="true"
            />
            {about.availability}
          </p>
        </aside>

        <div className="fade-up lg:col-span-8 [animation-delay:80ms]">
          <p className={eyebrow}>Over mij</p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Even voorstellen
          </h1>
          <p className="mt-3 text-lg text-accent">{about.role}</p>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
            {about.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
            <Link to="/projecten" className={buttonPrimary}>
              Bekijk mijn projecten <span aria-hidden="true">→</span>
            </Link>
            <a href={primaryContact.href} className={buttonSecondary}>
              Neem contact op
            </a>
          </div>
        </div>
      </section>

      <section className="bg-accent text-paper">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
              Visie
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              {about.visionTitle}
            </h2>
            <blockquote className="mt-8 border-l-2 border-paper/40 pl-5 font-display text-xl leading-snug italic text-paper/95">
              “{about.visionQuote}”
            </blockquote>
          </div>
          <div className="space-y-5 leading-relaxed text-paper/85 lg:col-span-7 lg:pt-10">
            {about.vision.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <p className={eyebrow}>Vaardigheden</p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
          Waar ik goed in ben
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {about.skillGroups.map((group, index) => (
            <article key={group.title} className="rounded-xl border border-line bg-card p-6">
              <span className="font-display text-sm text-muted tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-xl font-medium text-ink">{group.title}</h3>
              <p className="mt-1 text-sm text-muted">{group.description}</p>
              <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex gap-2.5 text-sm text-ink-soft">
                    <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-deep/60">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:py-20 md:grid-cols-2">
          <div>
            <p className={eyebrow}>Interesses</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
              Waar mijn aandacht naartoe gaat
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {about.interests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-line bg-card px-4 py-1.5 text-sm text-ink-soft"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={eyebrow}>Contact</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
              Laten we kennismaken
            </h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {about.contact.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`group flex items-center justify-between gap-4 py-4 ${focusRing}`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {link.label}
                    </span>
                    <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-accent">
                      <span className="truncate">{link.value}</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
