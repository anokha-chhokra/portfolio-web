import Reveal from './Reveal.jsx';
import { jobs } from '../data/content.js';

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="kicker">03 / experience</div>
            <h2>From enterprise systems to independent builds.</h2>
          </div>
          <p>
            Two chapters, with a common theme: improving how software behaves in production and
            turning requirements into working systems.
          </p>
        </Reveal>

        <Reveal className="card timeline">
          {jobs.map((job) => (
            <div className="job" key={job.title}>
              <h3>{job.title}</h3>
              <div className="meta">{job.meta}</div>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
