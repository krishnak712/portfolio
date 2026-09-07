export default function LoadingState({ label = 'Loading data...' }) {
  return <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-highest/40 font-code text-xs text-on-surface-variant animate-pulse">{label}</div>;
}
