import { photos, timeline } from '../data/content'
import { useLightbox } from './Lightbox'
import Section from './Section'

const About = () => {
  const open = useLightbox()
  const items = photos.map((p) => ({ src: p.src, caption: p.caption, type: p.type }))

  return (
    <Section id="about" title="About">
      <div className="grid md:grid-cols-12 gap-x-12 gap-y-10">
        <div className="md:col-span-7 space-y-4 text-[18px] text-ink/85">
          <p>
            I like aerodynamics and I like competing, and engineering turns out to be a good way to do both. The long-term
            goal is a career that combines them, ideally at an F1 team or in fighter-jet development.
          </p>
          <p>
            Everything on this page is something I was lucky to be part of, with good teammates and mentors. If you have
            feedback, or just want to talk about any of it, I’d genuinely like to hear from you.
          </p>
        </div>

        <div className="md:col-span-5">
          <p className="kicker mb-3">Career plans, abridged</p>
          <ol className="border-l border-rule">
            {timeline.map((t, i) => (
              <li key={t.year} className="relative pl-5 pb-4 last:pb-0">
                <span
                  className={`absolute -left-[4.5px] top-[0.55em] w-2 h-2 rounded-full ${
                    i === timeline.length - 1 ? 'bg-signal' : 'bg-paper border border-muted'
                  }`}
                />
                <span className="font-mono text-[13px] text-muted mr-3">{t.year}</span>
                <span className={i === timeline.length - 1 ? 'text-ink font-medium' : 'text-ink/80'}>{t.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-14">
        <p className="kicker mb-4">Outside the CAD window</p>
        <div className="columns-2 sm:columns-3 gap-3 [&>*]:mb-3">
          {photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => open(items, i)}
              className="group block w-full break-inside-avoid text-left"
              aria-label={`Open photo: ${p.caption}`}
            >
              {p.type === 'video' ? (
                <div className="relative">
                  <video src={p.src} muted playsInline preload="metadata" className="w-full rounded-[3px] bg-surface" />
                  <span className="absolute left-2 top-2 font-mono text-[11px] bg-black/60 text-white px-1.5 py-0.5 rounded-[2px]">
                    ▶ video
                  </span>
                </div>
              ) : (
                <img src={p.src} alt={p.caption} loading="lazy" decoding="async" className="w-full rounded-[3px] group-hover:opacity-90 transition-opacity" />
              )}
              <span className="block mt-1.5 text-[13px] text-muted leading-snug">{p.caption}</span>
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default About
