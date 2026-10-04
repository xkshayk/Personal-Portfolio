import { EMAIL, GITHUB, LINKEDIN, RESUME_URL, highlights } from '../data/content'

const Hero = () => {
  return (
    <section id="top" className="max-w-page mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
        <div className="md:col-span-7 lg:col-span-8">
          <p className="kicker">Mechanical Engineering + PEY Co-op · University of Toronto · 2028</p>

          <h1 className="font-serif text-[44px] sm:text-[60px] leading-[1.02] tracking-tight mt-4">
            Akshay Kolwalkar
          </h1>
          <p className="font-serif text-[22px] sm:text-[26px] leading-snug text-ink/80 mt-3 max-w-[36rem]">
            Mechanical engineer in training.
          </p>

          <div className="mt-6 space-y-4 text-[17px] text-ink/85 max-w-[38rem]">
            <p>
              Currently writing the attitude-control simulator for a CubeSat at <a href="#case-adcs" className="link">UTAT</a>, training
              reinforcement-learning policies for an autonomous race car at{' '}
              <a href="#case-f1tenth" className="link">LARRI</a>, and helping with aerodynamics on the UT27 car at UTFR.
            </p>
            <p className="text-muted text-[16px]">
              Minors in Robotics & Mechatronics and Engineering Business. <br></br>Based in Toronto and Louisville.<br></br>
              Seeking US internships and co-op roles in aerospace, motorsport, or autonomous systems.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn">
              Resume (PDF)
            </a>
            <a href={`mailto:${EMAIL}`} className="btn-quiet">Email</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-quiet">LinkedIn</a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn-quiet">GitHub</a>
          </div>
        </div>

        <figure className="md:col-span-5 lg:col-span-4">
          <img
            src="/media/portrait.webp"
            alt="Akshay looking into an aquarium tank"
            width={1050}
            height={1400}
            className="w-full max-w-[22rem] md:max-w-none aspect-[4/5] object-cover rounded-[3px]"
          />
          <figcaption className="mt-2 font-mono text-[12px] text-muted">Distracted by fish.</figcaption>
        </figure>
      </div>

      <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 border-t border-rule">
        {highlights.map((h, i) => (
          <a
            key={h.label}
            href={h.href}
            className={`group block py-5 pr-4 border-b border-rule lg:border-b-0 ${
              i % 2 === 1 ? 'pl-4 border-l' : ''
            } ${i >= 1 ? 'lg:pl-5 lg:border-l' : ''} border-rule`}
          >
            <dt className="sr-only">{h.label}</dt>
            <dd className="font-mono text-[28px] sm:text-[32px] leading-none text-ink group-hover:text-accent transition-colors">
              {h.value}
            </dd>
            <dd className="mt-2 text-[14px] leading-snug text-ink/80">{h.label}</dd>
            <dd className="mt-1 font-mono text-[11.5px] text-muted">{h.where}</dd>
          </a>
        ))}
      </dl>
    </section>
  )
}

export default Hero
