import { useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { fieldNotes } from '../data/portfolio'

const Photos = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)

  const closeLightbox = () => {
    setSelectedIndex(null)
    window.requestAnimationFrame(() => lastTrigger.current?.focus())
  }

  useEffect(() => {
    if (selectedIndex === null) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowRight') {
        setSelectedIndex((index) => index === null ? 0 : (index + 1) % fieldNotes.length)
      }
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((index) => index === null ? 0 : (index - 1 + fieldNotes.length) % fieldNotes.length)
      }

      if (event.key === 'Tab' && lightboxRef.current) {
        const controls = Array.from(lightboxRef.current.querySelectorAll<HTMLButtonElement>('button'))
        const first = controls[0]
        const last = controls[controls.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex])

  const openLightbox = (index: number, event: ReactMouseEvent<HTMLButtonElement>) => {
    lastTrigger.current = event.currentTarget
    setSelectedIndex(index)
  }

  const selectedNote = selectedIndex === null ? null : fieldNotes[selectedIndex]

  return (
    <section id="notes" className="field-notes section-space">
      <div className="page-shell">
        <div className="field-notes__heading" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">03 / Field notes</p>
            <h2>Off the workbench.</h2>
          </div>
          <p>
            Teams, machines, and a few places that made the long-term direction feel a lot
            less abstract.
          </p>
        </div>

        <div className="contact-sheet">
          {fieldNotes.map((note, index) => (
            <figure key={note.id} className={`contact-sheet__item contact-sheet__item--${note.size}`} data-reveal>
              <button type="button" onClick={(event) => openLightbox(index, event)} aria-label={`Open photo: ${note.caption}`}>
                <img src={note.src} alt={note.alt} loading="lazy" decoding="async" />
                <span className="contact-sheet__index">0{index + 1}</span>
                <span className="contact-sheet__open" aria-hidden="true">Open ↗</span>
              </button>
              <figcaption>{note.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {selectedNote && selectedIndex !== null && (
        <div
          ref={lightboxRef}
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${selectedIndex + 1} of ${fieldNotes.length}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox()
          }}
        >
          <div className="photo-lightbox__toolbar">
            <p>FIELD NOTE / {String(selectedIndex + 1).padStart(2, '0')}</p>
            <button ref={closeRef} type="button" onClick={closeLightbox}>Close <span aria-hidden="true">×</span></button>
          </div>

          <div className="photo-lightbox__stage">
            <img src={selectedNote.src} alt={selectedNote.alt} />
          </div>

          <div className="photo-lightbox__footer">
            <p>{selectedNote.caption}</p>
            <div>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => setSelectedIndex((selectedIndex - 1 + fieldNotes.length) % fieldNotes.length)}
              >
                ←
              </button>
              <span>{selectedIndex + 1} / {fieldNotes.length}</span>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setSelectedIndex((selectedIndex + 1) % fieldNotes.length)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Photos
