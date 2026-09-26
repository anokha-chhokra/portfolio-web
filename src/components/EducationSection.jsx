import Reveal from './Reveal.jsx';
import { credentials } from '../data/content.js';

export default function EducationSection() {
  return (
    <section className="section" id="education">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="kicker">04 / education &amp; achievements</div>
            <h2>Grounded in fundamentals, tested outside the classroom.</h2>
          </div>
          <p>Education, certification and a few memorable engineering achievements from the resume.</p>
        </Reveal>

        <Reveal as="div" className="creds-grid">
          {credentials.map((item) => (
            <div className="cred-card" key={item.title}>
              <span className="cred-type">{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.sub}</p>
              {item.detail && <p>{item.detail}</p>}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
