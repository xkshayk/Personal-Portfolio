import type { Figure } from '../data/content'
import { useLightbox } from './Lightbox'

interface Props {
  figures: Figure[]
  /** figure number of the first item */
  start: number
}

/** Numbered, captioned thumbnails; clicking opens the group in the lightbox. */
const FigureGrid = ({ figures, start }: Props) => {
  const open = useLightbox()
  const items = figures.map((f, i) => ({ src: f.src, caption: f.caption, label: `Fig. ${start + i}` }))

  return (
    <div className={`grid gap-x-5 gap-y-7 ${figures.length === 1 ? '' : 'sm:grid-cols-2'} ${figures.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
      {figures.map((f, i) => (
        <figure key={f.src}>
          <button
            onClick={() => open(items, i)}
            className="group block w-full aspect-[16/11] bg-surface border border-rule rounded-[3px] overflow-hidden"
            aria-label={`Enlarge: ${f.caption}`}
          >
            <img
              src={f.src}
              alt={f.caption}
              loading="lazy"
              decoding="async"
              className={`w-full h-full transition-opacity group-hover:opacity-90 ${
                f.fit === 'contain' ? 'object-contain p-1.5' : 'object-cover'
              }`}
            />
          </button>
          <figcaption className="mt-2 text-[13.5px] leading-snug text-muted">
            <span className="font-mono text-ink mr-1.5">Fig. {start + i}</span>
            {f.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default FigureGrid
