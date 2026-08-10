import type { PointerEvent } from 'react'

const Home = () => {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2

    event.currentTarget.style.setProperty('--pointer-x', `${(x * 8).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${(y * 7).toFixed(2)}px`)
  }

  const resetPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--pointer-x', '0px')
    event.currentTarget.style.setProperty('--pointer-y', '0px')
  }

  return (
    <section
      id="home"
      className="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__content page-shell">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Mechanical engineering · Toronto
          </p>

          <h1>
            I build things
            <span>that move.</span>
          </h1>

          <p className="hero__dek">
            I’m Akshay Kolwalkar, a University of Toronto student working where mechanics,
            autonomy, and flight systems meet.
          </p>

          <div className="hero__actions">
            <a className="button button--signal" href="#work">
              Open the project log <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="/Akshay Kolwalkar Resume Final.pdf" target="_blank" rel="noreferrer">
              Read my résumé <span aria-hidden="true">↗</span>
            </a>
          </div>

          <dl className="hero__proof" aria-label="Portfolio highlights">
            <div>
              <dt>06</dt>
              <dd>selected builds</dd>
            </div>
            <div>
              <dt>02</dt>
              <dd>NASA local awards</dd>
            </div>
            <div>
              <dt>∞</dt>
              <dd>questions left to test</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual" aria-label="Portrait and current project status">
          <div className="hero__orbit hero__orbit--outer" aria-hidden="true" />
          <div className="hero__orbit hero__orbit--inner" aria-hidden="true" />
          <div className="hero__crosshair" aria-hidden="true" />

          <figure className="portrait-card">
            <div className="portrait-card__image">
              <img
                src="/Akshay Aquarium.png"
                alt="Akshay Kolwalkar looking into an aquarium tank"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>SUBJECT / AK</span>
              <span>43.6532° N</span>
            </figcaption>
          </figure>

          <aside className="mission-card">
            <p className="mission-card__label">Current vector</p>
            <p>FINCH attitude planning + F1TENTH race prep</p>
            <span className="mission-card__rule" aria-hidden="true" />
          </aside>

          <span className="hero__coordinate hero__coordinate--x" aria-hidden="true">X / 083.4</span>
          <span className="hero__coordinate hero__coordinate--y" aria-hidden="true">Y / 217.8</span>
        </div>
      </div>

      <a className="hero__scroll-cue" href="#work">
        Selected work <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}

export default Home
