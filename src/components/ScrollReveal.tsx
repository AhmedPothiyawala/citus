import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Entrance animations modelled on the live theme:
 *  - headings: words slide up line-by-line from a mask ("line reveal")
 *  - [data-reveal="up"|"fade"] items: fade / fade-from-bottom, with optional data-delay (ms)
 *  - any other top-level section block: fade-from-bottom
 */
const splitWords = (el: HTMLElement) => {
  if (el.dataset.splitDone) return;
  // Only split headings whose content is plain text (no nested markup)
  if (Array.from(el.childNodes).some((n) => n.nodeType !== Node.TEXT_NODE)) return;
  const text = el.textContent || '';
  if (!text.trim()) return;
  el.dataset.splitDone = '1';
  el.setAttribute('aria-label', text.trim());
  el.textContent = '';
  text
    .trim()
    .split(/\s+/)
    .forEach((word, i, arr) => {
      const line = document.createElement('span');
      line.className = 'lr-line';
      line.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.className = 'lr-word';
      inner.style.transitionDelay = `${i * 45}ms`;
      inner.textContent = word;
      line.appendChild(inner);
      el.appendChild(line);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
    });
  el.classList.add('lr-ready');
};

export const ScrollReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add('reveal-in');
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // 1. Line-reveal headings
    document
      .querySelectorAll<HTMLElement>('main h1, main h2, main [data-split]')
      .forEach((h) => {
        if (h.closest('[data-no-reveal]')) return;
        splitWords(h);
        if (h.classList.contains('lr-ready')) observer.observe(h);
      });

    // 2. Explicit items
    const items = Array.from(document.querySelectorAll<HTMLElement>('main [data-reveal]'));
    items.forEach((el) => {
      const type = el.dataset.reveal === 'fade' ? 'reveal-fade' : 'reveal-init';
      el.classList.add(type);
      if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}ms`;
      observer.observe(el);
    });

    // 3. Remaining section blocks (skip those that manage their own children)
    document.querySelectorAll<HTMLElement>('main section > div').forEach((el) => {
      if (el.closest('[data-no-reveal]') || el.querySelector('[data-reveal]') || el.hasAttribute('data-reveal')) return;
      if (getComputedStyle(el).position === 'absolute') return;
      el.classList.add('reveal-init');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};
