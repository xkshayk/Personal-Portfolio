import { useState, useEffect } from 'react'

interface ProjectModalProps {
  project: {
    id: number
    title: string
    description: string
    images: string[]
    captions: string[]
  }
  onClose: () => void
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [captionVisible, setCaptionVisible] = useState(true)

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const nextImage = () => {
    setCaptionVisible(false)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
      setCaptionVisible(true)
    }, 300)
  }

  const prevImage = () => {
    setCaptionVisible(false)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
      setCaptionVisible(true)
    }, 300)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      onClick={onClose}
    >
      {/* Blurred background */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/30 dark:bg-black/60" />
      
      {/* Modal content */}
      <div 
        className="relative bg-gradient-to-br from-cyan-200 via-blue-200 to-teal-200 dark:from-slate-950 dark:via-blue-900 dark:to-cyan-900 rounded-lg shadow-2xl w-full max-w-[92vw] h-[84vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          aria-label="Close modal"
          title="Close"
        >
          <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Left side - Title and body text */}
          <div className="md:w-[30%] p-8 md:p-12 overflow-y-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {project.title}
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Right side - Image slideshow */}
          <div className="md:w-[70%] bg-white/20 dark:bg-black/20 backdrop-blur-sm relative flex flex-col items-center justify-center p-8">
            {/* Image */}
            <div className="w-full max-h-[79vh] flex items-center justify-center mb-4">
              <img 
                src={project.images[currentImageIndex]} 
                alt={project.captions[currentImageIndex]}
                className={`object-contain rounded-lg ${
                  project.id === 3 && currentImageIndex === 0
                    ? 'max-w-[160%] max-h-[89vh]'
                    : project.id === 6
                    ? 'max-w-[160%] max-h-[79vh]'
                    : 'max-w-full max-h-[79vh]'
                }`}
              />
            </div>

            {/* Caption with fade transition */}
            <div 
              className={`text-center text-sm text-gray-600 dark:text-gray-300 mb-6 transition-opacity duration-300 ${
                captionVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {project.captions[currentImageIndex]}
            </div>

            {/* Navigation buttons */}
            {project.images.length > 1 && (
              <div className="flex gap-4">
                <button
                  onClick={prevImage}
                  className="px-4 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  ← Previous
                </button>
                <button
                  onClick={nextImage}
                  className="px-4 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Slide indicator */}
            <div className="flex gap-2 mt-4">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCaptionVisible(false)
                    setTimeout(() => {
                      setCurrentImageIndex(index)
                      setCaptionVisible(true)
                    }, 300)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-primary-600 dark:bg-primary-400' : 'bg-gray-300 dark:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  title={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
