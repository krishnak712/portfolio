import { useEffect, useRef, useState } from "react";
import "./css/AnimatedBackground.css";

export default function AnimatedBackground({ className = "", children }) {
  const containerRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPointer({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };

    containerRef.current?.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => containerRef.current?.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`animated-background ${className}`.trim()}
      style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` }}
    >
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-gradient-layer" aria-hidden="true" />
      <div className="bg-orbital-layer" aria-hidden="true" />
      <div className="bg-pointer-light" aria-hidden="true" />
      {children}
    </div>
  );
}