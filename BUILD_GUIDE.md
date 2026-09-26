# Building This Portfolio From Scratch

## A step-by-step guide, with the "why" explained along the way

This guide walks through building this exact React app, one piece at a
time, the way a professional developer actually would: set up the
tools, lay a foundation, build small simple pieces first, then bigger
pieces that use them. Every step includes real code and a plain-English
explanation of the concept it introduces, so you understand *why* the
code is shaped the way it is — not just what to type.

You don't need to already know React. You do need to be comfortable
opening a terminal and a text editor.

---

## Concepts you'll meet along the way

Quick definitions so nothing feels like a mystery word later. You don't
need to memorize these now — just skim them once, then come back if a
later section uses a word you forgot.

| Word | What it means |
|---|---|
| **Component** | A reusable, self-contained piece of a UI — like a LEGO brick for web pages. A button, a card, a whole page section can all be "a component." |
| **JSX** | HTML-looking syntax you write inside JavaScript. It gets converted into regular JavaScript before it runs. |
| **Props** | Short for "properties" — data a parent component hands down to a child component, like arguments to a function. |
| **State** | Data a component remembers between renders, and that causes it to redraw itself when it changes (e.g. "is this menu open?"). |
| **Hook** | A special React function (always starting with `use`) that plugs a component into a React feature — state, side effects, context, etc. |
| **Effect** | Code that runs *after* a component renders, for anything that reaches outside React — talking to the browser, a timer, a subscription. |
| **Ref** | A box that holds a value across renders *without* causing a re-render when it changes — used for DOM nodes or "silent" mutable values. |
| **Context** | A way to make a piece of data available to many components without manually passing it down through every layer in between. |

---

## Part 0 — Tools you need

1. **Node.js** (version 18 or newer) — the engine that runs JavaScript
   outside a browser, and comes with `npm`, the tool that downloads
   code packages. Get it from [nodejs.org](https://nodejs.org).
2. **A code editor** — [VS Code](https://code.visualstudio.com) is the
   common choice.
3. **A terminal** — Terminal on macOS, Command Prompt/PowerShell on
   Windows.
4. *(Optional but "real environment")* **Git** — version control, so
   you can save checkpoints as you build. We'll mention it at a few
   milestones.

Check your tools are ready:

```bash
node -v      # should print v18.x or higher
npm -v       # should print a version number
```

---

## Part 1 — Scaffold the project

In a real environment, you never hand-write the boilerplate files for a
build tool — you let the tool generate them, then you customize. We're
using **Vite**, the current standard for starting a React project: it
gives you a dev server that updates the browser instantly as you save
files (this is called **Hot Module Replacement**, or HMR), and a
production build step that's fast and produces small output.

```bash
npm create vite@latest arbaj-portfolio -- --template react
cd arbaj-portfolio
npm install
npm run dev
```

That last command starts a local server, usually at
`http://localhost:5173`. Open it — you'll see Vite's default "count is
0" demo page. That's your proof the toolchain works before you've
written a single line of your own code. This is a real-world habit:
**verify the empty scaffold runs before you build on top of it.**

If you're using Git, this is checkpoint one:

```bash
git init
git add .
git commit -m "Scaffold Vite + React project"
```

---

## Part 2 — Tour the starter files

Vite generated a few files. Here's what each one is actually for:

- **`package.json`** — the project's ID card: its name, its
  dependencies (the packages it needs), and its `scripts` (shortcuts
  like `npm run dev`).
- **`vite.config.js`** — configuration for the build tool itself. Ours
  just needs the React plugin:

  ```js
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
  });
  ```

- **`index.html`** — the *one* real HTML page. Notice it has an empty
  `<div id="root"></div>` and a `<script>` tag pointing at
  `src/main.jsx`. React's whole job is to fill that empty div.
- **`src/main.jsx`** — the entry point: the very first JavaScript that
  runs.
- **`src/App.jsx`** — the top-level component everything else lives
  inside.

Delete the demo content Vite put in `src/App.jsx` and `src/index.css`
— we're starting our own layout from here.

---

## Part 3 — Plan the folder structure

Before writing components, decide where things live. This is called
**separation of concerns** — keeping different *kinds* of code apart so
each file has one clear job:

```
src/
  data/        plain content — text, arrays, objects. No UI code.
  context/     shared state that many components need (e.g. theme)
  hooks/       reusable logic that isn't tied to one component
  utils/       plain helper functions (no React involved)
  components/  the actual UI building blocks
```

Create the folders now:

```bash
mkdir -p src/data src/context src/hooks src/utils src/components
```

**Why separate `data` from `components`?** Imagine a real job on this
site: a recruiter needs their job title corrected. If all your text is
typed directly inside JSX, you have to go hunting through markup to
find it. If it lives in one `content.js` file as plain data, you edit
one line, in one place — the same reason a real app usually pulls this
kind of content from a CMS or a database instead of hardcoding it.

---

## Part 4 — Lay the foundation: global styles & design tokens

Before any component, set up `src/index.css` with **CSS custom
properties** (also called CSS variables) for your color palette:

```css
:root {
  --bg: #07131c;
  --text: #ecf7fb;
  --cyan: #64e7ff;
  --green: #72f1b8;
  --line: rgba(117, 177, 199, 0.18);
  --surface-2: #081922;
}

* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
}
```

**Why variables instead of writing `#64e7ff` everywhere?** Two reasons.
First, if the brand color changes, you edit one line instead of
search-and-replacing across every file. Second — and this is the big
one — it's what makes a **light/dark theme toggle** possible later
without rewriting every component: you just redefine what `--cyan`
*means* in one place, and every component that uses `var(--cyan)`
updates automatically. We'll lean on this hard in Part 18.

Import this stylesheet once, in `main.jsx` (you'll write that file in
Part 9).

---

## Part 5 — Build the content layer

Now fill `src/data/content.js` with the site's actual text, as plain
JavaScript arrays and objects — no JSX yet:

```js
export const metrics = [
  { value: '~4 yrs', label: 'experience stated in resume' },
  { value: '35%', label: 'validation-time reduction' },
  { value: '30%', label: 'fewer build failures after refactor' },
  { value: '8.72', label: 'B.Tech DGPA' },
];

export const contact = {
  name: 'Arbaj Ali',
  title: 'Java Developer · Spring Boot Developer · Backend Engineer',
  email: 'arbajali.dev@gmail.com',
  phone: '+91 7278781198',
  location: 'Kolkata, India',
  linkedin: 'https://linkedin.com/in/arbajali',
};

// ...and so on for every section: jobs, credentials, skills,
// skillCategories, archNodes, pipelineSteps, navLinks, etc.
```

This file ends up being the single biggest one in the project, purely
because it holds *all* the words on the page. That's intentional —
every component that follows will `import` from here instead of
containing hardcoded text.

**Checkpoint:** nothing renders yet — that's fine, data files don't
draw anything by themselves. Next, components.

---

## Part 6 — Your first component: `Footer`

Start with the simplest possible component to see the absolute basics
before adding any complexity:

```jsx
// src/components/Footer.jsx
export default function Footer() {
  return <footer>© Arbaj Ali · Built around the backend.</footer>;
}
```

That's it — a **component** is just a JavaScript function that returns
JSX (markup). No props, no state, nothing dynamic. `export default`
means "this is the one thing this file hands out when imported."

Wire it in so you can see it. In `src/App.jsx`:

```jsx
import Footer from './components/Footer.jsx';

export default function App() {
  return <Footer />;
}
```

And in `src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`createRoot(...).render(<App />)` is the line that actually takes over
that empty `<div id="root">` from Part 2 and starts drawing your React
tree into it. `<StrictMode>` is a free safety net during development —
it doesn't render anything itself, it just makes React double-check
your components for common mistakes.

**Checkpoint:** save, look at the browser. You should see the copyright
line. Real progress, however small — this is the loop you'll repeat for
every component: write it, import it, look at the browser.

---

## Part 7 — State and browser events: `ScrollProgress`

Next, a component that actually *does* something: a thin bar at the
top of the page that fills up as you scroll.

```jsx
// src/components/ScrollProgress.jsx
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setPercent(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="progress" style={{ width: `${percent}%` }} />;
}
```

Two new ideas here:

**`useState(0)`** gives this component a memory. It returns a pair: the
current value (`percent`) and a function to change it
(`setPercent`). Calling `setPercent` doesn't just update a variable —
it tells React "redraw this component with the new value," which is
why the bar visually grows.

**`useEffect(...)`** runs code that reaches *outside* React — here,
listening to the browser's scroll event. The empty array `[]` at the
end means "only run this setup once, when the component first
appears." The function you `return` from inside the effect is a
**cleanup function**: React calls it if the component ever disappears
from the page, so you don't leave an event listener running on
something that no longer exists. This return-a-cleanup-function pattern
is one of the most important habits in React — always ask "if this
component goes away, what do I need to undo?"

Add `<ScrollProgress />` above `<Footer />` in `App.jsx` and watch it
work as you scroll (you'll need enough content to actually scroll —
don't worry, that's coming fast).

---

## Part 8 — Refs and IntersectionObserver: `Reveal`

Nearly every section on this site fades gently into view as you scroll
to it. Rather than copy-pasting that logic into every section, we build
it **once** as a wrapper component that any content can be dropped
into.

```jsx
// src/components/Reveal.jsx
import { useEffect, useRef } from 'react';

export default function Reveal({ as: Tag = 'div', className = '', id, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) el.classList.add('show');
        });
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const combinedClassName = className ? `reveal ${className}` : 'reveal';

  return (
    <Tag ref={ref} id={id} className={combinedClassName} {...rest}>
      {children}
    </Tag>
  );
}
```

New ideas:

**`useRef(null)`** creates a box that can hold a value across renders
*without* triggering a re-render when it changes — the opposite of
`useState`. Here we use it to get a direct handle on the actual DOM
element React rendered, by passing `ref={ref}` to the tag. Once
attached, `ref.current` *is* that real `<div>` (or whatever `as` was
set to) sitting in the page.

**`IntersectionObserver`** is a browser feature that watches an element
and tells you when it scrolls into (or out of) view. We use it instead
of listening to the scroll event ourselves because it's built for
exactly this and doesn't run expensive calculations on every single
scroll pixel — much better for performance.

**`{ as: Tag = 'div', ...rest }`** is destructuring props with a
default. `as` lets a caller say "render this as a `<section>`" instead
of the default `<div>` — we capitalize it (`Tag`) because JSX treats a
lowercase tag name as a literal HTML tag, but a capitalized name as "a
variable holding a tag name."

Now *any* component can fade in on scroll just by wrapping its content:

```jsx
<Reveal className="card">
  <p>I fade in!</p>
</Reveal>
```

Add the matching CSS:

```css
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: 0.7s ease;
}
.reveal.show {
  opacity: 1;
  transform: none;
}
```

---

## Part 9 — The app shell: `Navbar`, `App`, `main`

With your two foundational helpers built, build the navigation that
wraps every page section.

```jsx
// src/components/Navbar.jsx
import { navLinks } from '../data/content.js';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="wrap navin">
        <a className="brand" href="#top">
          <span className="mark" />
          arbaj.dev
        </a>
        <div className="navlinks">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

New idea: **`.map()`**. Instead of writing seven near-identical `<a>`
tags by hand, we loop over the `navLinks` array from our data file and
produce one JSX element per entry. The `key={link.id}` prop is
required whenever you render a list in React — it's how React tells
each item apart between renders, so it can update just the one that
changed instead of redrawing the whole list. **Always use a stable,
unique key** — never the array index if the list can reorder.

This starter version is intentionally simple. We'll come back and add
a mobile menu, a theme toggle, and active-link highlighting once those
pieces exist (Parts 18–19).

Now assemble the shell in `App.jsx`:

```jsx
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="top">{/* sections go here */}</main>
      <Footer />
    </>
  );
}
```

`<>...</>` is a **Fragment** — a wrapper that groups elements without
adding an extra `<div>` to the actual page. React requires a component
to return one single element, and a Fragment is how you satisfy that
rule without extra markup you don't want.

**Checkpoint + commit:** you now have a working header, an empty page
body, and a footer. Good moment for `git commit -m "App shell: navbar,
scroll progress, footer"`.

---

## Part 10 — Your first content section: `Hero`

Now the pattern for every remaining section: pull data in, map it into
JSX, wrap the reveal-worthy parts in `<Reveal>`.

```jsx
// src/components/Hero.jsx
import Reveal from './Reveal.jsx';
import { metrics } from '../data/content.js';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <Reveal>
          <h1>
            Build the <em>engine</em> behind the experience.
          </h1>
          <div className="metrics">
            {metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <b>{metric.value}</b>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

Notice `{metric.value}` and `{metric.label}` — curly braces inside JSX
drop back into plain JavaScript. Anything inside `{}` is evaluated and
the *result* is what gets displayed. This is the core trick of JSX:
it's mostly HTML, but any `{ }` is an escape hatch back to real code.

Add `<Hero />` inside `<main>` in `App.jsx` and you'll see actual
content for the first time.

---

## Part 11 — Composing smaller pieces: `AboutSection`

```jsx
// src/components/AboutSection.jsx
import Reveal from './Reveal.jsx';
import { aboutParagraphs, aboutFacts } from '../data/content.js';

export default function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="grid2">
          <Reveal className="card about-card">
            <div className="avatar" aria-hidden="true">SA</div>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal className="card quick">
            {aboutFacts.map((fact) => (
              <div key={fact.label}>
                <small>{fact.label}</small>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

Nothing new technically here — this section exists to show that once
you have `Reveal` and the data-mapping pattern, building a *new*
section is mostly just deciding what data it needs and how to lay it
out. That's the payoff of building your foundation pieces first.

One detail worth noticing: `aria-hidden="true"` on the avatar. That
tells screen readers to skip it, because "S A" as decoration adds
nothing when the person's full name is already readable text right
next to it. We'll do a full accessibility pass in Part 20, but it's a
good habit to add these as you go rather than bolting them on later.

---

## Part 12 — Interactive state: `SystemSection`

This section has clickable diagram nodes — the first place we need a
component to *remember* which one was last clicked.

```jsx
// src/components/SystemSection.jsx
import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { archNodes, archCopy } from '../data/content.js';

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
        <Reveal className="card arch">
          <svg viewBox="0 0 620 275">
            {archNodes.map((node) => (
              <g
                key={node.id}
                className={`node${activeNode === node.id ? ' active' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={activeNode === node.id}
                onClick={() => handleNodeClick(node.id)}
                onKeyDown={(e) => handleNodeKeyDown(e, node.id)}
              >
                <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="12" />
                <text x={node.tx} y={node.ty} textAnchor="middle">{node.lines[0]}</text>
              </g>
            ))}
          </svg>
          <div className="interact-note" aria-live="polite">{note}</div>
        </Reveal>
      </div>
    </section>
  );
}
```

The important new idea: **state drives what's on screen, not the other
way around.** We never reach into the page and change a CSS class by
hand (that's how you'd do it with plain JavaScript). Instead, we store
*which node is active* as data (`activeNode`), and the JSX reads that
data every render to decide which node gets the `active` class. Click a
different node → state changes → React redraws → the class moves. This
is called **declarative UI**: you describe what the screen should look
like *for a given state*, and let React handle turning that into actual
DOM changes.

The second thing worth noticing: an SVG `<g>` element isn't a real
button, so a mouse click works but a keyboard Tab + Enter wouldn't,
by default. Adding `role="button"`, `tabIndex={0}`, and an
`onKeyDown` handler that responds to Enter and Space makes it behave
like one for keyboard and screen-reader users too. **If you add a click
handler to something that isn't naturally a button or a link, you're
responsible for also making it keyboard-operable.**

---

## Part 13 — List-rendering patterns: `ExperienceSection` & `EducationSection`

These two sections don't introduce new concepts — they're good
practice for the `.map()` pattern from Part 9, one level deeper (a list
of jobs, each containing a list of bullet points):

```jsx
// src/components/ExperienceSection.jsx
import Reveal from './Reveal.jsx';
import { jobs } from '../data/content.js';

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
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
```

`EducationSection` follows the exact same shape with a `credentials`
array instead of `jobs` — build it the same way. This repetition is
deliberate: once a pattern proves itself, reusing it is *better*
engineering than inventing a new approach for every section, because
the next developer (or future you) only has to learn the pattern once.

---

## Part 14 — Grids of data, and an honest empty state:
`CompletedProjectsSection` & `CurrentProjectsSection`

Same `.map()` pattern again, laying items out in a CSS grid
(`.pipeline`, `.project-grid`) instead of a vertical list — but this
project actually needs *two* sections, not one, because the resume
draws a real distinction between finished work and work in progress:

```jsx
// src/components/CompletedProjectsSection.jsx
import Reveal from './Reveal.jsx';
import { flagshipProject, pipelineSteps, completedProjects } from '../data/content.js';

export default function CompletedProjectsSection() {
  return (
    <section className="section" id="completed-projects">
      <div className="wrap">
        <Reveal className="card project">
          <div className="stackline">
            {flagshipProject.stack.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
          <div className="pipeline">
            {pipelineSteps.map((step) => (
              <div className="pipe" key={step.title}>
                <strong>{step.title}</strong>
                <small>{step.sub}</small>
              </div>
            ))}
          </div>
        </Reveal>

        {/* the rest of the shipped work, as simpler cards */}
        <Reveal as="div" className="project-grid">
          {completedProjects.map((project) => (
            <div className="project-card" key={project.title}>
              <h3>{project.title}</h3>
              <p className="muted">{project.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```

The layout work here is almost entirely CSS Grid (`grid-template-columns:
repeat(6, 1fr)`), not React — a good reminder that React's job is
*what* to render, and CSS still does *how it's arranged on screen*.

Its sibling, `CurrentProjectsSection`, is a good lesson in **not
inventing data you don't have**. Nothing in this resume was written as
"still in progress" — everything is past tense. Rather than guess or
pad the section with something misleading, the array it reads from
(`currentProjects`) starts empty on purpose, and the component checks
for that:

```jsx
// src/components/CurrentProjectsSection.jsx
import { currentProjects } from '../data/content.js';

export default function CurrentProjectsSection() {
  const hasProjects = currentProjects.length > 0;

  return hasProjects ? (
    <div className="project-grid">{/* map over currentProjects, same as above */}</div>
  ) : (
    <div className="card empty-state">
      <h3>Nothing published here yet</h3>
      <p className="muted">
        Add an entry to <code>currentProjects</code> in{' '}
        <code>src/data/content.js</code> and it appears here automatically.
      </p>
    </div>
  );
}
```

**This matters beyond this one project.** Any time you're building a
UI from real data — a resume, a database, an API response — resist the
urge to fill an empty section with a placeholder that *looks* like real
content. A clearly-labeled "nothing here yet" state is honest and easy
to replace later; a fake-looking entry is either misleading or, worse,
gets forgotten and shipped as if it were true.

---

## Part 15 — The click-to-select pattern: `StackSection`

This section reuses the exact "state decides what's active" idea from
Part 12, applied to a grid of buttons instead of SVG nodes:

```jsx
// src/components/StackSection.jsx
import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { skills } from '../data/content.js';

export default function StackSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSkill = skills[activeIndex];

  return (
    <section className="section" id="stack">
      <div className="wrap">
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
          <div className="mono" aria-live="polite">{activeSkill.detailTitle.toUpperCase()}</div>
          <div className="muted">{activeSkill.copy}</div>
        </Reveal>
      </div>
    </section>
  );
}
```

Notice this uses real `<button>` elements, not clickable `<div>`s like
an early draft might. That's a deliberate choice: a `<button>` is
automatically focusable, clickable with Enter/Space, and announced
correctly by screen readers — all "for free," with zero extra code.
**Prefer the HTML element that already does what you need over
reinventing it with a `<div>` and JavaScript.** Part 12's SVG node had
no such native option, which is *why* it needed the manual
`role`/`tabIndex`/`onKeyDown` treatment — use the shortcut when it
exists.

---

## Part 16 — The tricky one: `PlaygroundSection`

This is the most advanced component in the app: turn services on/off,
then "send" a fake transaction that logs a sequence of messages over
about a second, and the outcome of each step depends on whatever the
toggles are set to *at that moment* — even if the person keeps
clicking toggles while messages are still arriving.

```jsx
// src/components/PlaygroundSection.jsx
import { useEffect, useRef, useState } from 'react';

export default function PlaygroundSection() {
  const [toggles, setToggles] = useState({ Apigee: true, Kafka: true });
  const [log, setLog] = useState([]);

  const togglesRef = useRef(toggles);
  const timersRef = useRef([]);

  useEffect(() => {
    togglesRef.current = toggles;
  }, [toggles]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  function isOn(name) {
    return togglesRef.current[name];
  }

  function appendLine(text, cls) {
    setLog((prev) => [...prev, { text, cls }]);
  }

  function handleSend() {
    setLog([{ text: '[request] POST /transactions', cls: 'info' }]);
    timersRef.current.push(
      setTimeout(() => {
        isOn('Apigee')
          ? appendLine('[Apigee] policy validation → passed', 'good')
          : appendLine('[Apigee] gateway unavailable → blocked', 'bad');
      }, 180)
    );
    // ...more setTimeout steps at 400ms, 650ms, 900ms, 1150ms
  }

  return <button onClick={handleSend}>Send transaction →</button>;
}
```

Two ideas here that trip people up the first time:

**Why `togglesRef` *and* `toggles` state, instead of just state?** A
`setTimeout` callback captures the values that existed *when it was
created* — this is called a **closure**. If the callback that fires at
900ms just read `toggles` directly, it would always see the toggle
values from the moment `handleSend` was clicked, even if the person
flipped a switch in between. By keeping a `ref` that's always kept in
sync with the latest state (via that first `useEffect`), the delayed
callbacks can read `togglesRef.current` and get the truly *current*
value, not a frozen snapshot. This is a real, common pattern for
"I need the latest value inside a callback that outlives this render."

**Why clean up timers on unmount?** If someone clicks "Send" and then
immediately navigates away (in a bigger app with multiple pages) before
all five `setTimeout` calls have fired, the leftover timers would still
try to call `setState` on a component that no longer exists — wasted
work at best, a warning in your console at worst. Storing every timer
ID in `timersRef` and clearing them all in a cleanup function (`return
() => timersRef.current.forEach(clearTimeout)`) is the safe habit.

Also notice `role="log"` and `aria-live="polite"` on the console output
in the full version of this file — that tells assistive technology "new
messages will appear here over time, please announce them," which
matters a lot for a UI that updates itself without any new page
navigation.

---

## Part 17 — Contact section + a real utility function

`ContactSection` itself is another data-mapping component like the
ones before it — the new idea here is a **utility function**: plain
JavaScript that has nothing to do with React, imported and used inside
a component.

```js
// src/utils/vcard.js
function buildVCard({ name, email, phone }) {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `EMAIL;TYPE=INTERNET:${email}`,
    `TEL;TYPE=CELL:${phone}`,
    'END:VCARD',
  ].join('\r\n');
}

export function downloadVCard(data, filename = 'contact.vcf') {
  const vcard = buildVCard(data);
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
```

A `.vcf` file is just a specifically-formatted text file that contact
apps know how to import. We build that text ourselves, wrap it in a
**`Blob`** (the browser's way of representing raw file-like data in
memory), turn the blob into a temporary downloadable URL, and then do
something a little sneaky but standard: create an invisible `<a
download>` link, click it *with JavaScript* instead of a real mouse,
and immediately remove it. That's the browser-standard trick for
"trigger a file download from a button that isn't literally a link."

`SaveContactButton.jsx` just imports `downloadVCard` and calls it
`onClick` — proof that not everything in a React app has to *be* a
component; plain functions still do plain-function jobs.

---

## Part 18 — Theming with Context: no more prop-drilling

Right now, if you wanted a dark/light toggle, the naive approach is:
keep the current theme in `App.jsx`'s state, then pass it down as a
prop to every single component that needs to know about it — and every
component in between that doesn't even use it, just to relay it
further down. That's called **prop drilling**, and it gets painful
fast. **Context** solves it: any component, anywhere in the tree, can
read the current value directly.

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'arbaj-portfolio-theme';

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

Three pieces work together: **`createContext`** makes the "channel,"
**`<ThemeContext.Provider value={...}>`** broadcasts a value down to
every component nested inside it, and **`useContext`** (wrapped here in
our own `useTheme` hook for convenience) is how any descendant tunes in
and reads it — no matter how many components sit in between.

Wrap the whole app once, in `main.jsx`:

```jsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

Then any component — say, a `ThemeToggle` button — can do:

```jsx
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme === 'dark' ? 'Dark' : 'Light'}</button>;
}
```

(The real `ThemeToggle.jsx` in this project swaps in a small inline SVG
sun/moon icon instead of text, for a more polished look — same idea,
just a nicer button face.)

On the CSS side, this is where Part 4's variables pay off: define a
second set of values under a `[data-theme="light"]` selector, and
because every component already reads colors through `var(--cyan)` and
friends, flipping that one HTML attribute re-themes the *entire site*
with zero component changes:

```css
:root[data-theme='light'] {
  --bg: #eef5f7;
  --text: #0b1f27;
  --cyan: #0891b2;
}
```

One more real-world detail: without help, there's a one-frame flash of
the *wrong* theme on page load, because React's `useEffect` only runs
*after* the first paint. The fix is a tiny inline `<script>` directly
in `index.html`, before anything else loads, that reads the same
`localStorage` key and sets `data-theme` immediately:

```html
<script>
  (function () {
    var stored = localStorage.getItem('arbaj-portfolio-theme');
    document.documentElement.setAttribute('data-theme', stored || 'dark');
  })();
</script>
```

This has to duplicate a little logic outside of React on purpose —
React hasn't even started running yet at that point in the page's
life.

---

## Part 19 — Write your own hook: scroll-spy

`Navbar` should highlight whichever section is currently on screen.
The logic ("watch these elements, tell me which one is visible") isn't
tied to the navbar specifically, so we extract it into a **custom
hook** — any function whose name starts with `use` and that itself
calls other hooks inside it:

```js
// src/hooks/useActiveSection.js
import { useEffect, useState } from 'react';

export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join(',')]);

  return activeId;
}
```

This is the same `IntersectionObserver` idea from `Reveal` (Part 8),
reused for a different job: instead of "add a class once," it's
"continuously report which section counts as active." The
`rootMargin` trick shrinks the observer's viewport to a thin band
roughly in the middle of the screen, so a section counts as "active"
when it's near the center, not the instant one pixel peeks into view.

Using it is one line in `Navbar`:

```jsx
const activeId = useActiveSection(['about', 'system', 'experience', /* ... */]);
```

**Why is this better than copy-pasting the observer code straight into
`Navbar`?** If two different components ever needed "which section is
active" logic, you'd have two copies to keep in sync. A custom hook is
just a function — normal code reuse — that happens to be allowed to use
other hooks inside it.

---

## Part 20 — The accessibility pass

Go back through every section with these questions in mind:

- **Can I reach everything with only the Tab key?** (This is why
  Part 12's SVG nodes and Part 15's skill cards got explicit keyboard
  handling or were built as real buttons.)
- **Does a screen reader announce dynamic changes?** Anything that
  updates itself without a page reload — the diagram's note, the skill
  detail panel, the playground's console — gets `aria-live="polite"`
  so assistive tech speaks the update instead of it changing silently.
- **Can a keyboard user skip the repeated navbar?** Add one link, first
  thing in the page, visually hidden until it receives focus:

  ```css
  .skip-link {
    position: absolute;
    top: -60px;
    left: 12px;
    transition: top 0.2s;
  }
  .skip-link:focus {
    top: 12px;
  }
  ```

- **Is focus visible?** Add one global rule so keyboard users can see
  where they are:

  ```css
  :focus-visible {
    outline: 2px solid var(--cyan);
    outline-offset: 3px;
  }
  ```

- **Does the site respect "reduce motion" settings?** Some people set
  their OS to minimize animation (motion sickness, vestibular
  disorders). Honor it in one media query instead of asking every
  component to check:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

None of this is exotic — it's a checklist pass, done once near the end,
after the features exist to check.

---

## Part 21 — SEO and the favicon

The last polish pass lives entirely in `index.html`'s `<head>`: a
`<title>`, a `description` meta tag, Open Graph tags (what shows up
when the link is shared on social media), and a favicon so the browser
tab isn't blank. None of this is React — it's the same static HTML
metadata any website needs, and it only has to be written once because
this is a single-page site.

---

## Part 22 — Test it like a real QA pass

Run the dev server and go through the site with intent, not just a
glance:

```bash
npm run dev
```

- Click every interactive element: diagram nodes, skill cards, both
  playground toggles and the send button, the theme toggle, the mobile
  menu.
- Unplug your mouse (mentally, or actually) and Tab through the whole
  page. Everything clickable should get a visible focus ring in the
  order you'd expect.
- Shrink the browser window past 940px and 600px — the two breakpoints
  this CSS uses — and check nothing overlaps or overflows.
- Toggle the theme and re-check contrast, especially any hardcoded
  colors you might have missed pulling into variables.

---

## Part 23 — Build for production and deploy

Development mode (`npm run dev`) trades file size for speed of
iteration — it ships lots of extra code for hot-reloading and helpful
error messages. For the real, public version, you build:

```bash
npm run build
```

This produces a `dist/` folder: your JSX compiled down to plain
JavaScript, every CSS file combined and minified, filenames given
content hashes (so browsers cache them safely forever, and only
re-download what actually changed). Preview that exact output locally
before shipping it:

```bash
npm run preview
```

To put it on the actual internet, `dist/` is just static files — any
static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
Since the original version of this site lived on GitHub Pages, that's
a natural fit: push `dist/`'s contents to a `gh-pages` branch (the
`gh-pages` npm package automates this), or configure a GitHub Actions
workflow that runs `npm run build` and publishes `dist/` on every push
to `main`.

---

## What you actually learned

Stepping back, building this one portfolio site touched almost every
core React idea you'll use in any project:

- Components, props, and composing small ones into bigger ones
- `useState` for data that changes and should redraw the UI
- `useEffect` for reaching outside React, and cleaning up after
  yourself
- `useRef` for values that persist but shouldn't trigger a re-render
- Context, for sharing data without prop-drilling
- Writing your own custom hook to reuse stateful logic
- Rendering lists safely with `.map()` and `key`
- Real accessibility: keyboard support, `aria-live`, focus styles,
  reduced motion
- The dev-vs-production build distinction, and why it exists

From here, a good next exercise is picking one section and rebuilding
it with a twist — add a new skill category, a new playground service,
or a second project card — using the exact same patterns you just
practiced.
