import type { CSSProperties } from 'react'
import { bijlagen } from '../../data/bijlagen'
import { home } from '../../data/home'
import { Paperclip } from './marks'

const copy = home.about.attachments

// Vijf "polaroids" met paperclip, licht gedraaid en verspringend. Op kleinere schermen
// scrollt de rij horizontaal met snap en zijn rotatie en verspringing kleiner.
export default function Attachments() {
  return (
    <div className="flex flex-col gap-11">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-[3px] border-double border-b-ink pb-3">
        <h3 className="label-mono text-[13px] font-normal text-muted">{copy.title}</h3>
        <span aria-hidden="true" className="-rotate-2 font-hand text-2xl text-pen">
          {copy.note}
        </span>
      </div>

      <ul className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pt-8 pb-6 md:-mx-10 md:px-10 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-5 lg:gap-8 lg:overflow-visible lg:px-2 lg:pt-5 lg:pb-0">
        {bijlagen.map((bijlage) => (
          <li
            key={bijlage.letter}
            className="w-[220px] shrink-0 snap-center lg:mt-(--offset) lg:w-auto lg:shrink"
            style={{ '--offset': `${bijlage.offset}px` } as CSSProperties}
          >
            <figure
              className="relative flex rotate-(--tilt-small) flex-col gap-3 bg-white px-3 pt-3 pb-[18px] shadow-[0_1px_2px_rgba(21,23,26,0.12),0_10px_24px_rgba(21,23,26,0.08)] lg:rotate-(--tilt)"
              style={
                {
                  '--tilt': `${bijlage.tilt}deg`,
                  '--tilt-small': `${bijlage.tilt / 2}deg`,
                } as CSSProperties
              }
            >
              <Paperclip />
              <img
                src={bijlage.image}
                alt={bijlage.alt}
                width={400}
                height={400}
                loading="lazy"
                className="block aspect-square w-full object-cover"
              />
              <figcaption className="flex flex-col gap-1 px-0.5">
                <span className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <span className="font-hand text-[22px] font-bold whitespace-nowrap text-pen">
                    Bijlage {bijlage.letter}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{bijlage.account}</span>
                </span>
                <span className="font-hand text-[21px] leading-[1.15] text-ink">
                  {bijlage.caption}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}
