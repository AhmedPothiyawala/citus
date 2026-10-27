import React, { useEffect, useRef } from 'react';

/**
 * Full-width animated background: softly drifting network nodes that link up
 * when close, with light pulses travelling along the links. Nodes gently move
 * away from the pointer. Original canvas implementation, no libraries.
 */
export const NetworkField: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || typeof window === 'undefined') return;
    let ctx: CanvasRenderingContext2D | null = null;
    try { ctx = canvas.getContext('2d'); } catch { ctx = null; }
    if (!ctx) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    type Pulse = { a: number; b: number; t: number; s: number };
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 150;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(80, Math.max(24, Math.round((w * h) / 19000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.6,
        hue: Math.random(),
      }));
      pulses = [];
    };
    build();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(build) : null;
    ro?.observe(canvas);

    const section = canvas.parentElement;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    section?.addEventListener('pointermove', onMove);
    section?.addEventListener('pointerleave', onLeave);
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(([en]) => { visible = en.isIntersecting; }) : null;
    io?.observe(canvas);

    // Neutral slate tones so the background stays distinct from the colourful graph
    const col = (t: number, a: number) => {
      const from = [148, 163, 184], to = [100, 116, 139];
      const c = from.map((v, k) => Math.round(v + (to[k] - v) * t));
      return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) {
          // drift + gentle push away from the pointer
          const dx = n.x - mouse.x, dy = n.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 1) {
            const f = (1 - Math.sqrt(d2) / 140) * 0.6;
            n.vx += (dx / Math.sqrt(d2)) * f * 0.05;
            n.vy += (dy / Math.sqrt(d2)) * f * 0.05;
          }
          n.vx *= 0.985; n.vy *= 0.985;
          n.vx += (Math.random() - 0.5) * 0.01; n.vy += (Math.random() - 0.5) * 0.01;
          n.x += n.vx; n.y += n.vy;
          if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < LINK) {
            const near = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) < 160;
            ctx!.strokeStyle = col((a.hue + b.hue) / 2, (1 - d / LINK) * (near ? 0.3 : 0.12));
            ctx!.lineWidth = near ? 0.9 : 0.6;
            ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
            if (!reduce && pulses.length < 8 && Math.random() < 0.0005) pulses.push({ a: i, b: j, t: 0, s: 0.008 + Math.random() * 0.01 });
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx!.fillStyle = col(n.hue, 0.32);
        ctx!.beginPath(); ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx!.fill();
      }

      // travelling light pulses
      pulses = pulses.filter((p) => {
        const a = nodes[p.a], b = nodes[p.b];
        if (!a || !b || Math.hypot(a.x - b.x, a.y - b.y) > LINK) return false;
        p.t += p.s;
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        const g = ctx!.createRadialGradient(x, y, 0, x, y, 5);
        g.addColorStop(0, 'rgba(255,255,255,0.9)');
        g.addColorStop(0.4, col(a.hue, 0.35));
        g.addColorStop(1, col(a.hue, 0));
        ctx!.fillStyle = g;
        ctx!.beginPath(); ctx!.arc(x, y, 5, 0, Math.PI * 2); ctx!.fill();
        return p.t < 1;
      });
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect(); io?.disconnect();
      section?.removeEventListener('pointermove', onMove);
      section?.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
};
