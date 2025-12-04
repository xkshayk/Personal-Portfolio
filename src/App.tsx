import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
// import Photos from './components/Photos'
import Contact from './components/Contact'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode) {
      setDarkMode(savedMode === 'true')
    } else {
      // Check system preference
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    // Update document class and localStorage
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 via-30% to-teal-200 to-70% dark:from-slate-950 dark:via-blue-900 dark:via-40% dark:to-cyan-900 dark:to-80% text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Home />
        <About />
        <Projects />
        {/* <Photos /> */}
        <Contact />
      </main>
    </div>
  )
}

export default App
