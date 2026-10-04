import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import CaseStudies from './components/CaseStudies'
import Skills from './components/Skills'
import About from './components/About'
import Footer from './components/Footer'
import { LightboxProvider } from './components/Lightbox'

function App() {
  // index.html already applied the saved/system theme before paint; start from that
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((d) => {
      try {
        localStorage.setItem('darkMode', String(!d))
      } catch {
        // storage blocked (private mode): theme just won't persist
      }
      return !d
    })
  }

  return (
    <LightboxProvider>
      <a href="#experience" className="sr-only focus:not-sr-only focus:absolute focus:z-[70] focus:m-2 focus:px-3 focus:py-2 focus:bg-ink focus:text-paper">
        Skip to content
      </a>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <Experience />
        <CaseStudies />
        <Skills />
        <About />
      </main>
      <Footer />
    </LightboxProvider>
  )
}

export default App
