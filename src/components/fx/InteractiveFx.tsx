import { useEffect } from 'react';

/**
 * Pointer-driven effects for the home page (original implementation):
 *  - .tilt-3d       → card rotates in 3D toward the pointer, with a moving glare
 *  - .spotlight     → a soft glow follows the pointer across dark sections
 *  - scroll progress bar (#home-scroll-progress)
 * Touch devices and reduced-motion users get static cards.
 */
export const InteractiveFx = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia?.('(pointer: fine)').matches;
    const cleanups: (() => void)[] = [];

    if (!reduce && fine) {
      document.querySelectorAll<HTMLElement>('.tilt-3d').forEach((el) => {
        const max = Number(el.dataset.tiltMax || 8);
        let raf = 0;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            el.style.setProperty('--rx', `${(0.5 - py) * max}deg`);
            el.style.setProperty('--ry', `${(px - 0.5) * max}deg`);
            el.style.setProperty('--gx', `${px * 100}%`);
            el.style.setProperty('--gy', `${py * 100}%`);
            el.classList.add('is-tilting');
          });
        };
        const leave = () => {
          cancelAnimationFrame(raf);
          el.classList.remove('is-tilting');
          el.style.setProperty('--rx', '0deg');
          el.style.setProperty('--ry', '0deg');
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        });
      });

      document.querySelectorAll<HTMLElement>('.spotlight').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${e.clientX - r.left}px`);
          el.style.setProperty('--my', `${e.clientY - r.top}px`);
        };
        el.addEventListener('pointermove', move);
        cleanups.push(() => el.removeEventListener('pointermove', move));
      });
    }

    const bar = document.getElementById('home-scroll-progress');
    if (bar) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
};
