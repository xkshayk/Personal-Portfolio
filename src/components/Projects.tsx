import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react'
import { projects } from '../data/portfolio'
import type { PortfolioProject, ProjectCategory } from '../data/portfolio'

const RobotArmExperience = lazy(() => import('./RobotArmExperience'))

type Filter = 'All' | ProjectCategory

const filters: Filter[] = ['All', 'Space', 'Autonomy', 'Hardware', 'Software']

interface ProjectDialogProps {
  project: PortfolioProject
  onClose: () => void
}

const ProjectDialog = ({ project, onClose }: ProjectDialogProps) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [showModel, setShowModel] = useState(false)
  const dialogRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const nextImage = () => {
    setShowModel(false)
    setImageIndex((index) => (index + 1) % project.images.length)
  }

  const previousImage = () => {
    setShowModel(false)
    setImageIndex((index) => (index - 1 + project.images.length) % project.images.length)
  }

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && !showModel) {
        setImageIndex((index) => (index + 1) % project.images.length)
      }
      if (event.key === 'ArrowLeft' && !showModel) {
        setImageIndex((index) => (index - 1 + project.images.length) % project.images.length)
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

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
  }, [onClose, project.images.length, showModel])

  const handleBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="case-dialog__backdrop" onMouseDown={handleBackdropClick}>
      <section
        ref={dialogRef}
        className="case-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-title-${project.id}`}
      >
        <header className="case-dialog__header">
          <div>
            <p className="eyebrow">Case file / 0{project.id}</p>
            <h2 id={`case-title-${project.id}`}>{project.title}</h2>
          </div>
          <button ref={closeRef} className="case-dialog__close" type="button" onClick={onClose}>
            Close <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="case-dialog__body">
          <div className="case-dialog__media-column">
            {project.hasModel && (
              <div className="case-dialog__view-switch" aria-label="Select project view">
                <button
                  type="button"
                  className={!showModel ? 'is-active' : ''}
                  aria-pressed={!showModel}
                  onClick={() => setShowModel(false)}
                >
                  Gallery
                </button>
                <button
                  type="button"
                  className={showModel ? 'is-active' : ''}
                  aria-pressed={showModel}
                  onClick={() => setShowModel(true)}
                >
                  Explore 3D
                </button>
              </div>
            )}

            <div className={`case-dialog__media ${showModel ? 'case-dialog__media--model' : ''}`}>
              {showModel ? (
                <Suspense fallback={<div className="model-loading">Loading the assembly…</div>}>
                  <RobotArmExperience />
                </Suspense>
              ) : (
                <img
                  src={project.images[imageIndex]}
                  alt={project.imageAlt[imageIndex]}
                  decoding="async"
                />
              )}
            </div>

            {!showModel && (
              <div className="case-dialog__gallery-controls">
                <p aria-live="polite">
                  <span>FIG. {String(imageIndex + 1).padStart(2, '0')}</span>
                  {project.captions[imageIndex]}
                </p>

                {project.images.length > 1 && (
                  <div>
                    <button type="button" onClick={previousImage} aria-label="Previous project image">←</button>
                    <span>{imageIndex + 1} / {project.images.length}</span>
                    <button type="button" onClick={nextImage} aria-label="Next project image">→</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="case-dialog__details">
            <div className="case-dialog__status">
              <span>{project.category}</span>
              <span>{project.status}</span>
              <span>{project.date}</span>
            </div>

            <p className="case-dialog__description">{project.description}</p>

            <dl className="case-dialog__metrics">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.value}</dt>
                  <dd>{metric.label}</dd>
                </div>
              ))}
            </dl>

            <div className="case-dialog__tools">
              <p className="eyebrow">Methods / tools</p>
              <ul>
                {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

const Projects = () => {
  const [filter, setFilter] = useState<Filter>('All')
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)

  const visibleProjects = filter === 'All'
    ? projects
    : projects.filter((project) => project.category === filter)

  const openProject = (project: PortfolioProject, event: ReactMouseEvent<HTMLButtonElement>) => {
    lastTrigger.current = event.currentTarget
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
    window.requestAnimationFrame(() => lastTrigger.current?.focus())
  }

  const handleFilterKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const currentIndex = filters.indexOf(filter)
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return

    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const nextIndex = (currentIndex + direction + filters.length) % filters.length
    setFilter(filters[nextIndex])
  }

  return (
    <section id="work" className="work section-space">
      <div className="page-shell">
        <div className="work__heading" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">01 / Selected systems</p>
            <h2>Proof, not promises.</h2>
          </div>
          <p>
            Six builds across space systems, autonomous racing, mechanical design, and a
            side project for cleaner playlists. Pick a discipline or open a case file.
          </p>
        </div>

        <div
          className="project-filters"
          role="tablist"
          aria-label="Filter projects by discipline"
          onKeyDown={handleFilterKeyDown}
          data-reveal
        >
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={filter === item ? 'is-active' : ''}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="project-grid" aria-live="polite" data-reveal>
          {visibleProjects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card project-card--${project.slug} ${project.featured && filter === 'All' ? 'project-card--featured' : ''}`}
            >
              <div className="project-card__media">
                <img
                  src={project.images[0]}
                  alt={project.imageAlt[0]}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="project-card__figure">FIG. 0{project.id}</span>
                <span className="project-card__category">{project.category}</span>
              </div>

              <div className="project-card__body">
                <div className="project-card__meta">
                  <span>CASE 0{project.id}</span>
                  <span>{project.date}</span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.summary}</p>

                <dl className="project-card__metrics">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.value}</dt>
                      <dd>{metric.label}</dd>
                    </div>
                  ))}
                </dl>

                <button className="case-trigger" type="button" onClick={(event) => openProject(project, event)}>
                  Open case file <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectDialog project={selectedProject} onClose={closeProject} />}
    </section>
  )
}

export default Projects
