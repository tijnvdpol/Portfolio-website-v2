import type { ReactNode } from 'react'

// Kop van een subpagina: sectielabel, grote titel en een dubbele lijn, zoals een dossierkaft.
export default function PageIntro({
  label,
  title,
  children,
  className = '',
}: {
  label: string
  title: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <header className={`fade-up flex flex-col gap-5 border-b-4 border-double border-b-ink pb-10 ${className}`}>
      <p className="label-mono text-[13px] text-muted">{label}</p>
      <h1 className="head-cond max-w-[18ch] text-[clamp(2.75rem,8vw,5rem)] leading-[0.98]">{title}</h1>
      {children}
    </header>
  )
}
