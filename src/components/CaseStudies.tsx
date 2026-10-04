import type { ReactNode } from 'react'
import { caseStudies } from '../data/content'
import FigureGrid from './FigureGrid'
import MissionReplay from './MissionReplay'
import ResultBars from './ResultBars'
import RobotArmViewer from './RobotArmViewer'
import Section from './Section'

const CaseStudies = () => {
  // Figure numbers run continuously down the page, like a report
  let fig = 1

  return (
    <Section id="work" title="Projects" note="Results and figures from the work above, plus a few more">
      <div className="space-y-20 sm:space-y-24">
        {caseStudies.map((c) => {
          let special: ReactNode = null
          if (c.special) {
            const label = `Fig. ${fig++}`
            if (c.special === 'adcs-replay') special = <MissionReplay figLabel={label} />
            if (c.special === 'f1tenth-results') special = <ResultBars figLabel={label} />
            if (c.special === 'robot-arm-3d') special = <RobotArmViewer figLabel={label} />
          }
          const figStart = fig
          fig += c.figures.length
          const subStart = fig
          if (c.sub) fig += c.sub.figures.length

          return (
            <article key={c.id} id={c.id} className="scroll-mt-20">
              <p className="kicker">
                {c.context}
                {c.dates && <span className="text-muted/70"> · {c.dates}</span>}
              </p>
              <h3 className="font-serif text-[28px] sm:text-[34px] leading-tight tracking-tight mt-2 max-w-3xl">{c.title}</h3>

              <div className="mt-6 grid md:grid-cols-12 gap-x-12 gap-y-8">
                <div className="md:col-span-7 space-y-4 text-ink/85">
                  {c.intro.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>

                <aside className="md:col-span-5">
                  <dl className="border-t border-rule">
                    {c.facts.map((f) => (
                      <div key={f.label} className="flex items-baseline justify-between gap-4 py-2 border-b border-rule">
                        <dt className="text-[14px] text-muted">{f.label}</dt>
                        <dd className="font-mono text-[14px] text-right">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.stack.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </aside>
              </div>

              {special && <div className="mt-10">{special}</div>}

              {c.figures.length > 0 && (
                <div className="mt-10">
                  <FigureGrid figures={c.figures} start={figStart} />
                </div>
              )}

              {c.note && (
                <p className="mt-8 max-w-3xl text-[15px] text-ink/80 border-l-2 border-signal pl-4">
                  <span className="font-medium text-ink">Still open. </span>
                  {c.note}
                </p>
              )}

              {c.sub && (
                <div className="mt-12 pt-8 border-t border-rule border-dashed">
                  <h4 className="text-[19px] font-semibold">{c.sub.title}</h4>
                  <p className="mt-3 max-w-3xl text-ink/85">{c.sub.body}</p>
                  <div className="mt-6">
                    <FigureGrid figures={c.sub.figures} start={subStart} />
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </Section>
  )
}

export default CaseStudies
