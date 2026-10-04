import { useEffect, useState } from 'react'
import { RESUME_URL } from '../data/content'

interface NavProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const links = [
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
]

const Nav = ({ darkMode, toggleDarkMode }: NavProps) => {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // Highlight whichever section occupies the band just under the nav
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-30% 0px -65% 0px' },
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-paper transition-[border-color] ${
        scrolled ? 'border-b border-rule' : 'border-b border-transparent'
      }`}
    >
      <nav className="max-w-page mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 shrink-0" aria-label="Back to top">
          <img src="/fighter-jet-logo.png" alt="" className="h-4 w-auto dark:invert opacity-90" />
          <span className="font-serif text-[18px] font-semibold tracking-tight">Akshay Kolwalkar</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`px-3 py-1.5 text-[15px] transition-colors ${
                active === l.id ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {active === l.id && <span className="text-accent mr-1">·</span>}
              {l.label}
            </a>
          ))}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn-quiet ml-3">
            Resume ↗
          </a>
          <ThemeButton darkMode={darkMode} onClick={toggleDarkMode} />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeButton darkMode={darkMode} onClick={toggleDarkMode} />
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="btn-quiet"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-rule bg-paper">
          <ul className="max-w-page mx-auto px-4 py-2">
            {[...links, { id: 'contact', label: 'Contact' }].map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setMenuOpen(false)} className="block py-2.5 text-[16px] border-b border-rule/60">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="block py-2.5 text-[16px] text-accent">
                Resume (PDF) ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

const ThemeButton = ({ darkMode, onClick }: { darkMode: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="ml-1 w-9 h-9 inline-flex items-center justify-center text-muted hover:text-ink transition-colors"
    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    title={darkMode ? 'Light mode' : 'Dark mode'}
  >
    {darkMode ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" />
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    )}
  </button>
)

export default Nav
