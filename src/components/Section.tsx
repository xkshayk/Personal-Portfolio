import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  note?: ReactNode
  children: ReactNode
}

/** Page section with a hairline rule and serif heading. */
const Section = ({ id, title, note, children }: SectionProps) => (
  <section id={id} className="max-w-page mx-auto px-4 sm:px-6 py-14 sm:py-20">
    <div className="border-t border-ink/80 pt-4 mb-10 sm:mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h2 className="font-serif text-[30px] sm:text-[36px] tracking-tight">{title}</h2>
      {note && <p className="text-muted text-[15px]">{note}</p>}
    </div>
    {children}
  </section>
)

export default Section
