import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { navLinks } from '../data/content.js';

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  // Close the mobile panel on Escape, and if the viewport grows past the
  // mobile breakpoint while it's open.
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onResize() {
      if (window.innerWidth > 940) setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  function renderLinks(onLinkClick) {
    return navLinks.map((link) => (
      <a
        key={link.id}
        href={`#${link.id}`}
        aria-current={activeId === link.id ? 'true' : undefined}
        className={activeId === link.id ? 'active' : undefined}
        onClick={onLinkClick}
      >
        {link.label}
      </a>
    ));
  }

  return (
    <nav className="nav">
      <div className="wrap navin">
        <a className="brand" href="#top">
          <span className="mark" />
          arbaj.dev
        </a>
        <div className="nav-right">
          <div className="navlinks">{renderLinks()}</div>
          <ThemeToggle />
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              {open ? (
                <path
                  d="M5 5l14 14M19 5 5 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <>
          <div className="nav-backdrop" onClick={() => setOpen(false)} />
          <div className="mobile-panel" id="mobile-nav-panel">
            {renderLinks(() => setOpen(false))}
          </div>
        </>
      )}
    </nav>
  );
}
