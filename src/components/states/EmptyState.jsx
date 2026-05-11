export function EmptyState({ message = "No data available." }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-center">
      <span className="text-2xl">🌑</span>
      <p className="font-body-base text-body-base text-text-muted">{message}</p>
    </div>
  );
}
