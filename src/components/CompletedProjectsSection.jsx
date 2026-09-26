import Reveal from './Reveal.jsx';
import { flagshipProject, pipelineSteps, completedProjects } from '../data/content.js';

export default function CompletedProjectsSection() {
  return (
    <section className="section" id="completed-projects">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="kicker">05 / completed projects</div>
            <h2>Shipped and in production.</h2>
          </div>
          <p>
            The project that most clearly tells the backend story, plus the other freelance work
            that's already out the door.
          </p>
        </Reveal>

        <Reveal className="card project">
          <div className="project-side">
            <div className="project-label">{flagshipProject.label}</div>
            <div className="project-title">{flagshipProject.title}</div>
            <p className="muted">{flagshipProject.summary}</p>
            <div className="big">{flagshipProject.stat}</div>
            <div className="big-label">{flagshipProject.statLabel}</div>
            <div className="stackline">
              {flagshipProject.stack.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3>Transaction flow</h3>
            <div className="pipeline">
              {pipelineSteps.map((step) => (
                <div className="pipe" key={step.title}>
                  <strong>{step.title}</strong>
                  <small>{step.sub}</small>
                </div>
              ))}
            </div>
            <ul className="muted" style={{ marginTop: 24 }}>
              {flagshipProject.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal as="div" className="project-grid">
          {completedProjects.map((project) => (
            <div className="project-card" key={project.title}>
              <span className="project-context">{project.context}</span>
              <h3>{project.title}</h3>
              <p className="muted">{project.description}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
