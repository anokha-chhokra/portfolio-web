import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { archNodes, archCopy, capabilityTags } from '../data/content.js';

const DEFAULT_NOTE = 'Click a node to inspect the role it plays in the resume.';

export default function SystemSection() {
  const [activeNode, setActiveNode] = useState('Client');
  const [note, setNote] = useState(DEFAULT_NOTE);

  function handleNodeClick(id) {
    setActiveNode(id);
    setNote(`${id} — ${archCopy[id]}`);
  }

  function handleNodeKeyDown(e, id) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNodeClick(id);
    }
  }

  return (
    <section className="section" id="system">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="kicker">02 / system mindset</div>
            <h2>Think in systems, not screens.</h2>
          </div>
          <p>
            The resume points to a backend profile built around application logic, API
            governance, integrations, messaging, data and deployment. The portfolio turns those
            pieces into a clickable system map.
          </p>
        </Reveal>

        <div className="grid2">
          <Reveal className="card arch">
            <svg viewBox="0 0 620 275" aria-label="Interactive backend architecture diagram">
              <path
                className="path"
                d="M80 135 C160 135, 160 70, 245 70 S345 70, 370 135 S470 205, 545 205"
              />
              <path
                className="path"
                d="M80 135 C165 135, 190 205, 280 205 S390 135, 455 135 S520 135, 545 135"
              />
              {archNodes.map((node) => (
                <g
                  key={node.id}
                  className={`node${activeNode === node.id ? ' active' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={activeNode === node.id}
                  aria-label={`${node.id} — view role in architecture`}
                  onClick={() => handleNodeClick(node.id)}
                  onKeyDown={(e) => handleNodeKeyDown(e, node.id)}
                >
                  <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="12" />
                  {node.lines.map((line, i) => (
                    <text key={line} x={node.tx} y={node.ty + i * 15} textAnchor="middle">
                      {line}
                    </text>
                  ))}
                </g>
              ))}
            </svg>
            <div className="interact-note" aria-live="polite">
              {note}
            </div>
          </Reveal>

          <Reveal className="card">
            <h3>What I bring to the backend layer</h3>
            <p className="muted">
              Enterprise delivery at Cognizant plus independent software work gives the portfolio
              two complementary signals: structured business-system engineering and hands-on
              product implementation.
            </p>
            <div className="tags">
              {capabilityTags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 22 }}>
              <div className="kicker">Current profile</div>
              <div style={{ fontSize: 14, marginTop: 6 }}>Freelancer · Remote · Apr 2024–Present</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
