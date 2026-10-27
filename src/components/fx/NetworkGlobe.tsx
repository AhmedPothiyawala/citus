import React, { useEffect, useRef } from 'react';

/**
 * Original 3D network globe drawn on a 2D canvas (no external libraries).
 * Points are spread on a sphere, rotated in 3D and projected with perspective;
 * glowing arcs with travelling data packets connect random nodes.
 * The globe leans towards the mouse for a subtle parallax feel.
 */
interface Props {
  className?: string;
  /** dot / arc colours */
  colors?: [string, string];
}

const DEFAULT_COLORS: [string, string] = ['#00C4CC', '#2563EB'];

export const NetworkGlobe: React.FC<Props> = ({ className = '', colors = DEFAULT_COLORS }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Keep colours in a ref so parent re-renders (e.g. the typewriter) never restart the animation
  const colorsRef = useRef(colors);
  colorsRef.current = colors;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      ctx = null;
    }
    if (!ctx || typeof window === 'undefined') return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const N = 520;
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    const arcs = Array.from({ length: 14 }, () => ({
      a: Math.floor(Math.random() * N),
      b: Math.floor(Math.random() * N),
      p: Math.random(),
      s: 0.0025 + Math.random() * 0.004,
    }));

    let w = 0, h = 0, dpr = 1, raf = 0;
    let rotY = 0, tiltX = -0.35, targetTiltX = -0.35, targetYaw = 0, yawOffset = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetYaw = nx * 0.6;
      targetTiltX = -0.35 + ny * 0.4;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(([en]) => { visible = en.isIntersecting; })
      : null;
    io?.observe(canvas);

    const project = (p: [number, number, number], R: number, cx: number, cy: number) => {
      const yaw = rotY + yawOffset;
      let [x, y, z] = p;
      const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
      [x, z] = [x * cosY - z * sinY, x * sinY + z * cosY];
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
      [y, z] = [y * cosX - z * sinX, y * sinX + z * cosX];
      const persp = 2.6 / (2.6 + z);
      return { x: cx + x * R * persp, y: cy + y * R * persp, z, s: persp };
    };

    const draw = () => {
      const colors = colorsRef.current;
      if (!visible) { raf = requestAnimationFrame(draw); return; }
      ctx!.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2, cy = h / 2;

      // soft halo
      const g = ctx!.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.25);
      g.addColorStop(0, 'rgba(0,196,204,0.10)');
      g.addColorStop(1, 'rgba(37,99,235,0)');
      ctx!.fillStyle = g;
      ctx!.beginPath(); ctx!.arc(cx, cy, R * 1.25, 0, Math.PI * 2); ctx!.fill();

      // dots
      for (const p of pts) {
        const q = project(p, R, cx, cy);
        const front = q.z < 0;
        const a = front ? 0.95 : 0.25;
        ctx!.fillStyle = front ? colors[0] : colors[1];
        ctx!.globalAlpha = a;
        ctx!.beginPath();
        ctx!.arc(q.x, q.y, (front ? 2.1 : 1.3) * q.s, 0, Math.PI * 2);
        ctx!.fill();
      }

      // arcs + packets
      for (const arc of arcs) {
        const A = pts[arc.a], B = pts[arc.b];
        const mid: [number, number, number] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2];
        const len = Math.hypot(...mid) || 1;
        const lift = 1.35;
        const M: [number, number, number] = [mid[0] / len * lift, mid[1] / len * lift, mid[2] / len * lift];
        const pa = project(A, R, cx, cy), pb = project(B, R, cx, cy), pm = project(M, R, cx, cy);
        const front = pm.z < 0.2;
        ctx!.globalAlpha = front ? 0.55 : 0.12;
        const grad = ctx!.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        grad.addColorStop(0, colors[0]); grad.addColorStop(1, colors[1]);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.1;
        ctx!.beginPath();
        ctx!.moveTo(pa.x, pa.y);
        ctx!.quadraticCurveTo(pm.x, pm.y, pb.x, pb.y);
        ctx!.stroke();
        // travelling packet
        const t = arc.p;
        const px = (1 - t) * (1 - t) * pa.x + 2 * (1 - t) * t * pm.x + t * t * pb.x;
        const py = (1 - t) * (1 - t) * pa.y + 2 * (1 - t) * t * pm.y + t * t * pb.y;
        ctx!.globalAlpha = front ? 1 : 0.25;
        ctx!.fillStyle = '#ffffff';
        ctx!.shadowColor = colors[0];
        ctx!.shadowBlur = 10;
        ctx!.beginPath(); ctx!.arc(px, py, 2.2, 0, Math.PI * 2); ctx!.fill();
        ctx!.shadowBlur = 0;
        if (!reduce) {
          arc.p += arc.s;
          if (arc.p > 1) {
            arc.p = 0;
            arc.a = Math.floor(Math.random() * N);
            arc.b = Math.floor(Math.random() * N);
          }
        }
      }
      ctx!.globalAlpha = 1;

      if (!reduce) rotY += 0.0026;
      yawOffset += (targetYaw - yawOffset) * 0.05;
      tiltX += (targetTiltX - tiltX) * 0.05;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro?.disconnect();
      io?.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
