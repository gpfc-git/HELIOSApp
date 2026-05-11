export function SignalCard({
  title,
  source,
  icon,
  rightSlot,
  children,
  accent = "#c0c1ff",
}) {
  return (
    <section className="bg-surface border border-border rounded-xl p-card-padding flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2
          className="font-headline-md text-headline-md flex items-center gap-2"
          style={{ color: accent }}
        >
          {icon && (
            <span className="material-symbols-outlined text-[22px]">
              {icon}
            </span>
          )}
          <span className="text-text-primary">{title}</span>
        </h2>
        <div className="shrink-0">
          {rightSlot ??
            (source && (
              <span className="font-metadata text-metadata text-text-muted">
                {source}
              </span>
            ))}
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}
