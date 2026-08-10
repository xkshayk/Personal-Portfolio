import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Projects from './components/Projects'
import About from './components/About'
import Photos from './components/Photos'
import Contact from './components/Contact'

const App = () => {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Home />
        <Projects />
        <About />
        <Photos />
        <Contact />
      </main>
    </div>
  )
}

export default App
