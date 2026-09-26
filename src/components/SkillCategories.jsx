import { skillCategories } from '../data/content.js';

export default function SkillCategories() {
  return (
    <div className="skill-categories">
      {skillCategories.map((category) => (
        <div className="skill-category" key={category.label}>
          <h4>{category.label}</h4>
          <div className="tags">
            {category.items.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
