import { useEffect, useRef, useState } from "react";

export function useTilt({
  maxTilt = 4,
  perspective = 1000,
  scale = 1.02,
  speed = 300,
  easing = "cubic-bezier(0.2, 0.7, 0.2, 1)",
  disabled = false,
  onTiltChange,
} = {}) {
  const elementRef = useRef(null);
  const frameRef = useRef(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;
    const handler = (e) => (reducedMotionRef.current = e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const reset = () => {
    if (elementRef.current) {
      elementRef.current.style.transform = "";
      elementRef.current.style.transformStyle = "";
      elementRef.current.style.willChange = "";
    }
    setTilt({ x: 0, y: 0 });
    onTiltChange?.({ x: 0, y: 0 });
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element || disabled || reducedMotionRef.current) {
      return undefined;
    }

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (coarsePointer.matches) {
      return undefined;
    }

    element.style.transformStyle = "preserve-3d";
    element.style.transition = `transform ${speed}ms ${easing}`;
    element.style.willChange = "transform";

    const handlePointerMove = (event) => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        const tiltX = y * -maxTilt;
        const tiltY = x * maxTilt;

        element.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
        setTilt({ x: tiltX, y: tiltY });
        onTiltChange?.({ x: tiltX, y: tiltY });
      });
    };

    const handlePointerEnter = () => {
      setIsHovering(true);
      element.style.transition = `transform ${speed}ms ${easing}`;
    };

    const handlePointerLeave = () => {
      setIsHovering(false);
      element.style.transition = `transform ${speed * 1.5}ms ${easing}`;
      reset();
    };

    element.addEventListener("pointermove", handlePointerMove, { passive: true });
    element.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    element.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerenter", handlePointerEnter);
      element.removeEventListener("pointerleave", handlePointerLeave);
      reset();
    };
  }, [disabled, maxTilt, perspective, scale, speed, easing, onTiltChange]);

  return { ref: elementRef, tilt, isHovering, reset };
}