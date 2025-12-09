import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        // Once visible, we can disconnect to prevent re-triggering
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }, {
      threshold: 0.1,
      ...options
    })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  return { elementRef, isVisible }
}
