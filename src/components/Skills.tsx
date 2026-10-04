import { coursework, skills } from '../data/content'
import Section from './Section'

const Skills = () => (
  <Section id="skills" title="Skills">
    <dl className="divide-y divide-rule border-y border-rule">
      {skills.map((s) => (
        <div key={s.group} className="grid md:grid-cols-12 gap-x-10 gap-y-2 py-4">
          <dt className="md:col-span-3 kicker pt-1">{s.group}</dt>
          <dd className="md:col-span-9 text-[16px] text-ink/85">{s.items.join(' · ')}</dd>
        </div>
      ))}
      <div className="grid md:grid-cols-12 gap-x-10 gap-y-2 py-4">
        <dt className="md:col-span-3 kicker pt-1">Coursework</dt>
        <dd className="md:col-span-9 text-[16px] text-ink/85">{coursework}</dd>
      </div>
    </dl>
  </Section>
)

export default Skills
