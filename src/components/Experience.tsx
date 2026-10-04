import { experience } from '../data/content'
import Rich from './Rich'
import Section from './Section'

const Experience = () => (
  <Section id="experience" title="Experience" note="Work, research and design teams">
    <ol className="space-y-12 sm:space-y-14">
      {experience.map((e) => (
        <li key={e.id} className="grid md:grid-cols-12 gap-x-10 gap-y-3">
          <div className="md:col-span-3 font-mono text-[13px] text-muted leading-relaxed">
            <p className="text-ink">{e.dates}</p>
            <p>{e.location}</p>
          </div>

          <div className="md:col-span-9">
            <h3 className="text-[20px] sm:text-[21px] font-semibold leading-snug">
              {e.role}
              <span className="text-muted font-normal"> · {e.org}</span>
            </h3>
            <p className="mt-2 text-ink/85">{e.summary}</p>

            <ul className="mt-4 space-y-2.5 text-[16px] text-ink/80">
              {e.bullets.map((b) => (
                <li key={b} className="pl-5 relative">
                  <span className="absolute left-0 top-[0.7em] w-2 h-px bg-muted" aria-hidden />
                  <Rich text={b} />
                </li>
              ))}
            </ul>

            {e.results && (
              <dl className="mt-5 grid grid-cols-3 max-w-lg border-y border-rule divide-x divide-rule">
                {e.results.map((r) => (
                  <div key={r.label} className="py-3 px-3 first:pl-0">
                    <dd className="font-mono text-[22px] leading-none">{r.value}</dd>
                    <dt className="mt-1.5 text-[12.5px] text-muted leading-snug">{r.label}</dt>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              {e.stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
              {e.caseStudy && (
                <a href={`#${e.caseStudy}`} className="ml-2 text-[14px] text-accent hover:underline underline-offset-4">
                  Results & figures ↓
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  </Section>
)

export default Experience
