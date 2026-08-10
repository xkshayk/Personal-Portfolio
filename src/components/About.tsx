const milestones = [
  { year: '2006', label: 'Born curious' },
  { year: '2013', label: 'Wanted to be Messi' },
  { year: '2019', label: 'Then Kevin Durant' },
  { year: 'Now', label: 'Building toward flight' },
]

const About = () => {
  return (
    <section id="trajectory" className="trajectory section-space">
      <div className="page-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">02 / Trajectory</p>
          <h2>A straight line would be boring.</h2>
        </div>

        <div className="trajectory__layout">
          <div className="trajectory__portrait" data-reveal>
            <img
              src="/Akshay Aquarium.png"
              alt="Akshay Kolwalkar at an aquarium"
              loading="lazy"
              decoding="async"
            />
            <span className="figure-label">FIG. 07 / CURIOSITY, STILL ACTIVE</span>
          </div>

          <div className="trajectory__copy" data-reveal>
            <p className="trajectory__lead">
              I’m a Mechanical Engineering student at the University of Toronto, drawn to
              machines that have to make decisions at speed.
            </p>
            <p>
              I like moving between the physical and digital sides of a problem: shaping a
              mechanism in CAD, modeling how it behaves, then writing the logic that lets it
              act in the real world. Aerospace and competition are the long-term pull.
            </p>

            <blockquote>
              “Flying beyond Mach 2 at 6 a.m., then sitting down with engineers to discuss
              improvements, wouldn’t feel like a job at all.”
            </blockquote>

            <a className="button button--ink" href="/Akshay Kolwalkar Resume Final.pdf" target="_blank" rel="noreferrer">
              Full résumé <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <ol className="trajectory-line" aria-label="A short personal timeline" data-reveal>
          {milestones.map((milestone, index) => (
            <li key={milestone.year}>
              <span className="trajectory-line__number">0{index + 1}</span>
              <p>{milestone.label}</p>
              <time>{milestone.year}</time>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default About
