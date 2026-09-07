import { useEffect, useState } from 'react';
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0.05 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);
  return activeId;
}
