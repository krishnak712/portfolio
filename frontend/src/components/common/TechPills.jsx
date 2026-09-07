export default function TechPills({ items = [] }) {
  return <div className="flex flex-wrap gap-1.5 pt-1">{items.map((item) => <span key={item} className="px-2 py-0.5 rounded bg-surface-container font-code text-[10px] text-on-surface">{item}</span>)}</div>;
}
