import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export interface LightboxItem {
  src: string
  caption: string
  label?: string
  type?: 'video'
}

interface LightboxState {
  items: LightboxItem[]
  index: number
}

const LightboxContext = createContext<(items: LightboxItem[], index: number) => void>(() => {})

export const useLightbox = () => useContext(LightboxContext)

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<LightboxState | null>(null)

  const open = useCallback((items: LightboxItem[], index: number) => setState({ items, index }), [])
  const close = useCallback(() => setState(null), [])
  const step = useCallback(
    (dir: number) =>
      setState((s) => (s ? { ...s, index: (s.index + dir + s.items.length) % s.items.length } : s)),
    [],
  )

  useEffect(() => {
    if (!state) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [state, close, step])

  const item = state?.items[state.index]

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {state && item && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white/70 font-mono text-[13px]">
            <span>
              {state.index + 1} / {state.items.length}
            </span>
            <button onClick={close} className="px-2 py-1 hover:text-white" aria-label="Close">
              Close ✕
            </button>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center px-4 sm:px-16 relative">
            {item.type === 'video' ? (
              <video
                src={item.src}
                className="max-w-full max-h-full"
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={item.src}
                alt={item.caption}
                className="max-w-full max-h-full object-contain bg-white/5"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {state.items.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl px-3 py-6"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl px-3 py-6"
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <p className="px-4 py-4 text-center text-white/85 text-[15px] max-w-3xl mx-auto">
            {item.label && <span className="font-mono text-white/50 mr-2">{item.label}</span>}
            {item.caption}
          </p>
        </div>
      )}
    </LightboxContext.Provider>
  )
}
