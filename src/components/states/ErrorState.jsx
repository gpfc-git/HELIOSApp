export function ErrorState({ message = "Failed to load data.", onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 py-6 text-center"
    >
      <span className="text-2xl">⚠️</span>
      <p className="font-telemetry text-telemetry text-danger">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 rounded-md font-metadata text-metadata border border-border text-text-muted hover:text-on-surface transition cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
}
