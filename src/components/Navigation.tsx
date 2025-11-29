import { useState, useEffect } from 'react'

interface NavigationProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Navigation = ({ darkMode, toggleDarkMode }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Adjust scroll position so header appears near top
      const elementPosition = element.getBoundingClientRect().top
      const targetPosition = elementPosition + window.pageYOffset - offset
      const start = window.pageYOffset
      const startTime = performance.now()
      const duration = 1000 // 1 second

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = easeInOutCubic(progress)
        
        window.scrollTo(0, start + (targetPosition - start) * ease)
        
        if (progress < 1) {
          requestAnimationFrame(scroll)
        }
      }

      requestAnimationFrame(scroll)
    }
  }

  const scrollToTop = () => {
    const start = window.pageYOffset
    const startTime = performance.now()
    const duration = 1000 // 1 second

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = easeInOutCubic(progress)
      
      window.scrollTo(0, start * (1 - ease))
      
      if (progress < 1) {
        requestAnimationFrame(scroll)
      }
    }

    requestAnimationFrame(scroll)
  }

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="hover:opacity-80 transition-opacity -ml-12"
            aria-label="Scroll to top"
          >
            <img src="/src/resources/fighter-jet-logo.png" alt="Logo" className="h-10 w-auto" />
          </button>
          
          <div className="flex items-center gap-8">
            <ul className="flex gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-xl font-bold transition-colors px-3 py-2 rounded-lg ${
                      activeSection === item.id
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-lg bg-gradient-to-br from-cyan-200/60 via-blue-200/60 to-teal-200/60 dark:from-slate-950/60 dark:via-blue-900/60 dark:to-cyan-900/60 backdrop-blur-sm hover:from-cyan-200/80 hover:via-blue-200/80 hover:to-teal-200/80 dark:hover:from-slate-950/80 dark:hover:via-blue-900/80 dark:hover:to-cyan-900/80 transition-all"
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                // Sun icon
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon icon
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
