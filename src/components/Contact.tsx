const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact__grid" aria-hidden="true" />
      <div className="page-shell contact__content">
        <p className="eyebrow" data-reveal>04 / Open channel</p>

        <div className="contact__headline" data-reveal>
          <h2>Have a problem with moving parts?</h2>
          <p>
            If you’re working on spacecraft, autonomous systems, racing, or something that
            sounds slightly impossible, I’d like to hear about it.
          </p>
        </div>

        <div className="contact__links" data-reveal>
          <a href="https://linkedin.com/in/akshay-kolwalkar" target="_blank" rel="noreferrer">
            <span>01</span>
            LinkedIn
            <strong aria-hidden="true">↗</strong>
          </a>
          <a href="https://github.com/xkshayk" target="_blank" rel="noreferrer">
            <span>02</span>
            GitHub
            <strong aria-hidden="true">↗</strong>
          </a>
          <a href="/Akshay Kolwalkar Resume Final.pdf" target="_blank" rel="noreferrer">
            <span>03</span>
            Résumé
            <strong aria-hidden="true">↗</strong>
          </a>
        </div>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Akshay Kolwalkar</p>
          <p>Designed like a field log. Built to keep evolving.</p>
          <a href="#home">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}

export default Contact
