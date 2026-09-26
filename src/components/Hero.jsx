import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import { metrics, stackJson } from '../data/content.js';

function formatUptime(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function Hero() {
  const stackEntries = Object.entries(stackJson);
  const [uptime, setUptime] = useState(0);

  // A little backend-engineer joke: the terminal panel tracks its own
  // "uptime" for as long as this tab has been open, the way you'd check a
  // real service's health endpoint.
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      setUptime(Math.round((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <Reveal>
          <div className="kicker">Java Developer · Spring Boot · Backend Engineer</div>
          <h1>
            Build the <em>engine</em> behind the experience.
          </h1>
          <p className="lede">
            I&rsquo;m Arbaj Ali — a backend-focused software engineer working across Java, Python,
            Spring Boot, RESTful APIs, microservices, cloud platforms and GenAI tooling, with
            about four years split between enterprise delivery at Cognizant and freelance work.
          </p>
          <div className="actions">
            <a className="btn primary" href="#completed-projects">
              Explore the backend ↓
            </a>
            <a className="btn" href="/Arbaj-Ali-Resume.pdf" target="_blank" rel="noreferrer">
              Open resume ↗
            </a>
            <a
              className="btn"
              href="https://linkedin.com/in/arbajali"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
          <div className="metrics">
            {metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <b>{metric.value}</b>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" className="terminal">
          <div className="termbar">
            <span className="orb r" />
            <span className="orb y" />
            <span className="orb g" />
            <span className="termname">arbaj@backend-node:~</span>
          </div>
          <div className="screen">
            <div>
              <span className="prompt">$</span> whoami
            </div>
            <div>arbaj-ali</div>
            <div>
              <span className="prompt">$</span> cat ./stack.json
            </div>
            <div>{'{'}</div>
            {stackEntries.map(([key, values], i) => (
              <div key={key}>
                {'  '}
                <span className="key">&quot;{key}&quot;</span>: [
                {values.map((v) => `"${v}"`).join(', ')}]
                {i < stackEntries.length - 1 ? ',' : ''}
              </div>
            ))}
            <div>{'}'}</div>
            <div style={{ marginTop: 10 }}>
              <span className="prompt">$</span> healthcheck <span className="status">OK</span>{' '}
              <span className="comment">· uptime {formatUptime(uptime)}</span>{' '}
              <span className="cursor" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
