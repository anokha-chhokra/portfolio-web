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
