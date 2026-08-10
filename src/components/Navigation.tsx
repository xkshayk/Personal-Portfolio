import { useEffect, useState } from 'react'

const navigationItems = [
  { id: 'work', label: 'Work' },
  { id: 'trajectory', label: 'Trajectory' },
  { id: 'notes', label: 'Field notes' },
  { id: 'contact', label: 'Contact' },
]

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observedSections = ['home', ...navigationItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.2, 0.5] },
    )

    observedSections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0

    const updateProgress = () => {
      frame = 0
      const available = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(available > 0 ? Math.min(window.scrollY / available, 1) : 0)
    }

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <a className="wordmark" href="#home" onClick={() => setMenuOpen(false)} aria-label="Akshay Kolwalkar, back to top">
          <img src="/fighter-jet-logo.svg" alt="" aria-hidden="true" />
          <span>
            Akshay <strong>/ 01</strong>
          </span>
        </a>

        <button
          className="index-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span>{menuOpen ? 'Close' : 'Index'}</span>
          <span className="index-toggle__mark" aria-hidden="true">{menuOpen ? '×' : '+'}</span>
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation ${menuOpen ? 'primary-navigation--open' : ''}`}
          aria-label="Primary navigation"
        >
          <ol>
            {navigationItems.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="primary-navigation__number">0{index + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
          <a className="primary-navigation__resume" href="/Akshay Kolwalkar Resume Final.pdf" target="_blank" rel="noreferrer">
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>

      <div className="scroll-rule" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
    </header>
  )
}

export default Navigation
