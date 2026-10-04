import { EMAIL, GITHUB, LINKEDIN, RESUME_URL } from '../data/content'

const Footer = () => (
  <footer id="contact" className="max-w-page mx-auto px-4 sm:px-6 pt-14 pb-12">
    <div className="border-t border-ink/80 pt-8 grid md:grid-cols-12 gap-8">
      <div className="md:col-span-7">
        <h2 className="font-serif text-[30px] sm:text-[36px] tracking-tight">Get in touch</h2>
        <p className="mt-3 text-ink/85 max-w-xl">
          The fastest way to reach me is email. I’m happy to talk about internships, co-ops, any of the projects above,
          or aero in general.
        </p>
        <a href={`mailto:${EMAIL}`} className="inline-block mt-5 font-mono text-[16px] sm:text-[18px] link break-all">
          {EMAIL}
        </a>
      </div>
      <ul className="md:col-span-5 md:justify-self-end space-y-2 text-[16px]">
        <li><a className="link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
        <li><a className="link" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
        <li><a className="link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">Resume (PDF) ↗</a></li>
      </ul>
    </div>
    <p className="mt-14 font-mono text-[12px] text-muted">
      © {new Date().getFullYear()} Akshay Kolwalkar · Built with React and Three.js
    </p>
  </footer>
)

export default Footer
