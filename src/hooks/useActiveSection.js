import { useEffect, useState } from 'react';

/**
 * Tracks which of the given section ids is currently most relevant on
 * screen, for scroll-spy style active-nav-link highlighting.
 */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')]);

  return activeId;
}
