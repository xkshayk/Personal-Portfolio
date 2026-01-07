import { useState, useEffect, useRef } from 'react'

interface MediaItem {
  id: number
  src: string
  caption: string
  type: 'image' | 'video'
}

const Photos = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Extract caption from filename
  const getCaption = (filename: string): string => {
    // Remove file extension and path
    const name = filename.split('/').pop()?.replace(/\.[^/.]+$/, '') || ''
    // Replace underscores and hyphens with spaces, handle camelCase
    return name
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const mediaItems: MediaItem[] = [
    { id: 1, src: '/APS111 Team Project.jpg', caption: getCaption('APS111 Team Project.jpg'), type: 'image' },
    { id: 2, src: '/Space Center Houston.png', caption: getCaption('Space Center Houston.png'), type: 'image' },
    { id: 3, src: '/Houston HOSA ILC 2024.png', caption: getCaption('Houston HOSA ILC 2024.png'), type: 'image' },
    { id: 4, src: '/VEX Team Pic.png', caption: getCaption('VEX Team Pic.png'), type: 'image' },
    { id: 5, src: '/VEX Team Demonstration.MP4', caption: getCaption('VEX Team Demonstration.MP4'), type: 'video' },
    { id: 6, src: '/Norton Healthcare CNA Training.PNG', caption: getCaption('Norton Healthcare CNA Training.PNG'), type: 'image' },
    { id: 7, src: '/Test Vitals.PNG', caption: getCaption('Test Vitals.PNG'), type: 'image' },
    { id: 8, src: '/Sr-71 Blackbird (with mom cameo).png', caption: getCaption('Sr-71 Blackbird (with mom cameo).png'), type: 'image' },
    { id: 9, src: '/F-117 Nighthawk.png', caption: getCaption('F-117 Nighthawk.png'), type: 'image' },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  // Internal function for autoplay (doesn't stop autoplay)
  const autoAdvance = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isFullscreen) {
      autoPlayRef.current = setInterval(() => {
        autoAdvance()
      }, 2500)
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, isFullscreen, currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'ArrowRight') nextSlide()
        if (e.key === 'ArrowLeft') prevSlide()
        if (e.key === 'Escape') setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex
    const total = mediaItems.length
    
    // Handle wrapping
    let adjustedDiff = diff
    if (diff > total / 2) adjustedDiff = diff - total
    if (diff < -total / 2) adjustedDiff = diff + total
    
    return adjustedDiff
  }

  return (
    <section id="photos" className="min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-16 animate-fade-in-up">
          Photos
        </h2>

        {/* Main Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div 
            className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          >
            {/* Slides */}
            {mediaItems.map((item, index) => {
              const position = getSlidePosition(index)
              const isActive = position === 0
              const isVisible = Math.abs(position) <= 2
              
              if (!isVisible) return null

              const getPositionClasses = (pos: number, active: boolean) => {
                const translateClasses: Record<string, string> = {
                  '-2': '-translate-x-[170%]',
                  '-1': '-translate-x-[85%]',
                  '0': 'translate-x-0',
                  '1': 'translate-x-[85%]',
                  '2': 'translate-x-[170%]',
                }
                const translateClass = translateClasses[pos.toString()] || 'translate-x-0'
                const scaleClass = active ? 'scale-100' : 'scale-[0.85]'
                const opacityClass = active ? 'opacity-100' : 'opacity-50'
                const brightnessClass = active ? '' : 'brightness-[0.7]'
                return `${translateClass} ${scaleClass} ${opacityClass} ${brightnessClass}`
              }

              return (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    isActive ? 'z-20' : 'z-10'
                  } ${getPositionClasses(position, isActive)}`}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl dark:shadow-white/10">
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay={isActive}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              )
            })}

            {/* Gradient Overlays for depth effect */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cyan-200/80 via-cyan-200/40 to-transparent dark:from-slate-950/80 dark:via-slate-950/40 dark:to-transparent z-30 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-teal-200/80 via-teal-200/40 to-transparent dark:from-cyan-900/80 dark:via-cyan-900/40 dark:to-transparent z-30 pointer-events-none" />
          </div>

          {/* Caption */}
          <div className="text-center mt-6 animate-fade-in">
            <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {mediaItems[currentIndex].caption}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {currentIndex + 1} / {mediaItems.length}
              {mediaItems[currentIndex].type === 'video' && ' • Video'}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-cyan-500 dark:bg-cyan-400'
                    : 'w-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isAutoPlaying
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {isAutoPlaying ? '⏸ Pause' : '▶ Auto-play'}
            </button>
          </div>
        </div>

        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Main content */}
            <div 
              className="max-w-[90vw] max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {mediaItems[currentIndex].type === 'video' ? (
                <video
                  src={mediaItems[currentIndex].src}
                  className="max-w-full max-h-[85vh] rounded-lg"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={mediaItems[currentIndex].src}
                  alt={mediaItems[currentIndex].caption}
                  className="max-w-full max-h-[85vh] rounded-lg object-contain"
                />
              )}

              {/* Caption in fullscreen */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <p className="text-white text-xl font-semibold text-center">
                  {mediaItems[currentIndex].caption}
                </p>
              </div>
            </div>

            {/* Fullscreen navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Previous"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Next"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {mediaItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={(e) => { e.stopPropagation(); goToSlide(index) }}
                  className={`w-16 h-12 rounded overflow-hidden transition-all duration-200 ${
                    index === currentIndex 
                      ? 'ring-2 ring-white scale-110' 
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  ) : (
                    <img src={item.src} alt="" className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Photos
