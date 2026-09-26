import { useEffect } from 'react';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import BackToTop from './components/BackToTop.jsx';
import Hero from './components/Hero.jsx';
import AboutSection from './components/AboutSection.jsx';
import SystemSection from './components/SystemSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import EducationSection from './components/EducationSection.jsx';
import CompletedProjectsSection from './components/CompletedProjectsSection.jsx';
import CurrentProjectsSection from './components/CurrentProjectsSection.jsx';
import StackSection from './components/StackSection.jsx';
import PlaygroundSection from './components/PlaygroundSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import { contact } from './data/content.js';

export default function App() {
  // A small easter egg for anyone who pops the devtools open — the exact
  // audience for a backend-engineer portfolio.
  useEffect(() => {
    const line = 'font-family: ui-monospace, monospace; font-size: 12px;';
    console.log('%c$ whoami', `${line} color:#72f1b8`);
    console.log(`%c${contact.name.toLowerCase().replace(/\s+/g, '-')}`, `${line} color:#ecf7fb`);
    console.log('%chey, fellow developer — thanks for popping the hood.', `${line} color:#64e7ff`);
    console.log(`%cwant to talk backend? ${contact.email}`, `${line} color:#91acb8`);
  }, []);

  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="top" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <SystemSection />
        <ExperienceSection />
        <EducationSection />
        <CompletedProjectsSection />
        <CurrentProjectsSection />
        <StackSection />
        <PlaygroundSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
