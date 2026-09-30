import { home } from '../../data/home'
import { focusRing } from '../../lib/styles'
import InvoiceDemo from './InvoiceDemo'
import { NoteArrow } from './marks'

const hero = home.hero

export default function Hero() {
  return (
    <section className="grid items-start gap-12 px-4 pt-10 pb-16 md:px-10 lg:grid-cols-[7fr_5fr] lg:gap-x-[72px] lg:pt-20 lg:pb-26 xl:px-20">
      <div className="flex min-w-0 flex-col gap-8">
        <p className="label-mono text-[13px] text-muted">{hero.eyebrow}</p>

        <div className="flex flex-col">
          <h1 className="head-cond text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.95] tracking-[-0.01em] lg:text-[clamp(2.75rem,6.4vw,5.75rem)]">
            {hero.headline} <span className="text-accent">{hero.headlineAccent}</span>
          </h1>
          <p className="mt-1.5 flex -rotate-3 items-center gap-1.5 self-end font-hand text-2xl font-medium text-pen sm:text-[26px]">
            <NoteArrow />
            <span>{hero.note}</span>
          </p>
        </div>

        <p className="max-w-[600px] text-lg leading-[1.55] text-ink-soft sm:text-xl">{hero.intro}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={hero.primaryCta.href}
            className={`inline-flex h-[52px] items-center gap-2.5 bg-ink px-6 text-base font-semibold text-paper transition-colors hover:bg-accent ${focusRing}`}
          >
            {hero.primaryCta.label} <span aria-hidden="true">↓</span>
          </a>
          <a
            href={hero.secondaryCta.href}
            className={`inline-flex h-[52px] items-center border-[1.5px] border-ink px-6 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-paper ${focusRing}`}
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <InvoiceDemo />
    </section>
  )
}
