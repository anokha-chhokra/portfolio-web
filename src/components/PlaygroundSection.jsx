import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { services, serviceLabels } from '../data/content.js';

const INITIAL_LOG = [
  { text: '[system] simulation ready', cls: 'info' },
  { text: '[health] Apigee · Spring Boot · Kafka · SQL/JDBC = online', cls: 'good' },
];

export default function PlaygroundSection() {
  const [toggles, setToggles] = useState({
    Apigee: true,
    'Spring Boot': true,
    Kafka: true,
    SQL: true,
  });
  const [log, setLog] = useState(INITIAL_LOG);

  const togglesRef = useRef(toggles);
  const consoleRef = useRef(null);
  const timersRef = useRef([]);

  useEffect(() => {
    togglesRef.current = toggles;
  }, [toggles]);

  useEffect(() => {
    const el = consoleRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  function isOn(name) {
    return togglesRef.current[name];
  }

  function toggle(name) {
    setToggles((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  function appendLine(text, cls) {
    setLog((prev) => [...prev, { text, cls }]);
  }

  function handleSend() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setLog([{ text: '[request] POST /transactions', cls: 'info' }]);

    timersRef.current.push(
      setTimeout(() => {
        isOn('Apigee')
          ? appendLine('[Apigee] policy validation → passed', 'good')
          : appendLine('[Apigee] gateway unavailable → blocked', 'bad');
      }, 180)
    );

    timersRef.current.push(
      setTimeout(() => {
        isOn('Spring Boot') && isOn('Apigee')
          ? appendLine('[Spring Boot] transaction service → accepted', 'good')
          : appendLine('[Spring Boot] service unavailable → rejected', 'warn');
      }, 400)
    );

    timersRef.current.push(
      setTimeout(() => {
        isOn('Kafka')
          ? appendLine('[Kafka] transaction.processed → event published', 'good')
          : appendLine('[Kafka] async event path disabled', 'warn');
      }, 650)
    );

    timersRef.current.push(
      setTimeout(() => {
        isOn('SQL')
          ? appendLine('[SQL/JDBC] persistence → committed', 'good')
          : appendLine('[SQL/JDBC] database unavailable → rollback', 'bad');
      }, 900)
    );

    timersRef.current.push(
      setTimeout(() => {
        const ok = isOn('Apigee') && isOn('Spring Boot') && isOn('SQL');
        appendLine(
          ok ? '[response] 200 OK · transaction complete' : '[response] 503 Service Unavailable · dependency check failed',
          ok ? 'good' : 'bad'
        );
      }, 1150)
    );
  }

  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="kicker">08 / interactive playground</div>
            <h2>Simulate a transaction.</h2>
          </div>
          <p>
            This is a visual simulation, not a live service. Toggle components and watch the
            request log react to the architecture described in the resume.
          </p>
        </Reveal>

        <div className="play">
          <Reveal className="card">
            <h3>Service controls</h3>
            <p className="muted">Turn components on or off, then fire a sample transaction.</p>
            <div className="toggles">
              {services.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`toggle${toggles[name] ? ' on' : ''}`}
                  aria-pressed={toggles[name]}
                  onClick={() => toggle(name)}
                >
                  {serviceLabels[name]}
                </button>
              ))}
            </div>
            <button type="button" className="btn primary send" onClick={handleSend}>
              Send transaction →
            </button>
          </Reveal>

          <Reveal className="card">
            <div
              className="console"
              ref={consoleRef}
              role="log"
              aria-live="polite"
              aria-label="Transaction simulation log"
            >
              {log.map((entry, i) => (
                <div className={`logline ${entry.cls}`} key={`${i}-${entry.text}`}>
                  {entry.text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
