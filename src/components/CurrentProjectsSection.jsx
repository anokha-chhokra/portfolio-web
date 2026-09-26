import Reveal from './Reveal.jsx';
import { currentProjects } from '../data/content.js';

export default function CurrentProjectsSection() {
  const hasProjects = currentProjects.length > 0;

  return (
    <section className="section" id="current-projects">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="kicker">06 / currently working on</div>
            <h2>What&rsquo;s on the bench right now.</h2>
          </div>
          <p>Live status of freelance work in progress — updated as things ship.</p>
        </Reveal>

        {hasProjects ? (
          <Reveal as="div" className="project-grid">
            {currentProjects.map((project) => (
              <div className="project-card" key={project.title}>
                <span className="project-context in-progress">{project.status || 'In progress'}</span>
                <h3>{project.title}</h3>
                <p className="muted">{project.description}</p>
                {project.tags && (
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Reveal>
        ) : (
          <Reveal className="card empty-state">
            <div className="empty-state-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path
                  d="M12 5v14M5 12h14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3>Nothing published here yet</h3>
            <p className="muted">
              This section is wired up and ready to go — add an entry to the{' '}
              <code>currentProjects</code> array in <code>src/data/content.js</code> and it will
              appear here automatically, in the same card style as the completed projects above.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
