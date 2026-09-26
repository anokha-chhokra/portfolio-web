import Reveal from './Reveal.jsx';
import SaveContactButton from './SaveContactButton.jsx';
import { contact } from '../data/content.js';

export default function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact">
          <Reveal className="card">
            <div className="kicker">09 / connect</div>
            <h2>Let&rsquo;s talk backend.</h2>
            <p className="muted">
              Based in {contact.location}. For conversations around Java, Spring Boot, REST APIs,
              microservices, integration, performance or software engineering opportunities.
            </p>
            <div className="actions">
              <a className="btn primary" href={`mailto:${contact.email}`}>
                Email me ↗
              </a>
              <a className="btn" href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
                Call ↗
              </a>
              <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a className="btn" href="/Arbaj-Ali-Resume.pdf" target="_blank" rel="noreferrer">
                Resume ↗
              </a>
              <SaveContactButton />
            </div>
          </Reveal>

          <Reveal className="card quick">
            <div>
              <small>Email</small>
              <strong>{contact.email}</strong>
            </div>
            <div>
              <small>Location</small>
              <strong>{contact.location}</strong>
            </div>
            <div>
              <small>Title</small>
              <strong>{contact.title}</strong>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
