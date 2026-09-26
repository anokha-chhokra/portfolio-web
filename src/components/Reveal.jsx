import { useEffect, useRef } from 'react';

/**
 * Wraps content so it fades/slides into view the first time it enters the
 * viewport — a small React port of the original IntersectionObserver-based
 * scroll-reveal effect. Once shown, an element stays shown.
 */
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
