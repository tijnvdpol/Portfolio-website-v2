import { Link } from 'react-router-dom'
import { about } from '../../data/about'
import { home } from '../../data/home'
import { focusRing } from '../../lib/styles'
import Attachments from './Attachments'
import { CameraIcon, Paperclip } from './marks'

const copy = home.about

// Over mij: foto, tekst en het NU-blok, met daaronder de bijlagen (vrije tijd).
export default function AboutSection() {
  return (
    <section
      id="over"
      aria-labelledby="over-title"
      className="anchor-offset flex flex-col gap-20 px-4 py-20 md:px-10 lg:gap-24 lg:py-28 xl:px-20"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[300px_minmax(0,1fr)_320px] lg:gap-16">
        {/* Portret als polaroid met paperclip, zoals de bijlagen hieronder. */}
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
              role="img"
              aria-label="Plek voor een portretfoto van Tijn"
              className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 border-[1.5px] border-dashed border-[#8a8578] bg-paper-deep font-mono text-[13px] text-muted"
            >
              <CameraIcon />
              <span>{copy.photoPlaceholder}</span>
            </div>
          )}
        </figure>

        <div className="flex min-w-0 flex-col gap-[22px]">
          <p className="label-mono text-[13px] text-muted">{copy.label}</p>
          <h2 id="over-title" className="head-cond text-[clamp(2.5rem,7vw,3.75rem)] leading-none">
            {copy.title}
          </h2>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[17px] leading-[1.6] text-ink-soft sm:text-[19px]">
              {paragraph}
            </p>
          ))}
          <Link
            to={copy.profileLink.to}
            className={`self-start text-base font-semibold link-double ${focusRing}`}
          >
            {copy.profileLink.label}
          </Link>
        </div>

        <aside
          aria-label={copy.now.title}
          className="flex flex-col gap-3 border-[1.5px] border-ink bg-card px-[22px] py-5"
        >
          <p className="label-mono flex items-center gap-2 text-xs">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            <span>{copy.now.title}</span>
          </p>
          <ul className="flex flex-col gap-2 text-base leading-normal">
            {copy.now.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li className="text-muted">{copy.now.working}</li>
          </ul>
        </aside>
      </div>

      <Attachments />
    </section>
  )
}
