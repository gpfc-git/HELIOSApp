export function LoadingState({ rows = 3 }) {
  return (
    <div
      className="flex flex-col gap-3 animate-pulse"
      aria-busy="true"
      aria-label="Loading…"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-5 bg-surface-2 rounded-md" />
      ))}
    </div>
  );
}
