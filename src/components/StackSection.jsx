import { useState } from 'react';
import Reveal from './Reveal.jsx';
import SkillCategories from './SkillCategories.jsx';
import { skills } from '../data/content.js';

export default function StackSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSkill = skills[activeIndex];

  return (
    <section className="section" id="stack">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="kicker">07 / technical stack</div>
            <h2>Click a capability.</h2>
          </div>
          <p>
            Each card is mapped to the terminology used in the resume, so the interaction shows
            where the technology fits rather than pretending to add unsupported experience.
          </p>
        </Reveal>

        <Reveal>
          <p className="muted skill-categories-lead">
            Everything from the resume, grouped the way a hiring manager would scan it:
          </p>
          <SkillCategories />
        </Reveal>

        <Reveal as="div" className="skill-grid">
          {skills.map((skill, index) => (
            <button
              key={skill.heading}
              type="button"
              className={`skill${index === activeIndex ? ' active' : ''}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <strong>{skill.heading}</strong>
              <small>{skill.sub}</small>
            </button>
          ))}
        </Reveal>

        <Reveal className="card skilldetail">
          <div className="mono" aria-live="polite">
            {activeSkill.detailTitle.toUpperCase()}
          </div>
          <div className="muted" style={{ marginTop: 5 }}>
            {activeSkill.copy}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
