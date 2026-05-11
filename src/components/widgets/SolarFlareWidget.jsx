import { useSolarFlares } from "../../hooks/useSolarFlares";
import { SignalCard } from "../ui/SignalCard";
import { LoadingState } from "../states/LoadingState";
import { ErrorState } from "../states/ErrorState";
import { EmptyState } from "../states/EmptyState";

function classBadgeClass(classType = "") {
  const letter = classType[0]?.toUpperCase();
  if (letter === "X") return "bg-danger/15 text-danger";
  if (letter === "M") return "bg-warning/15 text-warning";
  if (letter === "C") return "bg-success/15 text-success";
  return "bg-surface-2 text-text-muted";
}

export function SolarFlareWidget() {
  const { data, isLoading, isError, error, refetch } = useSolarFlares();
  const recent = data?.slice(0, 8) ?? [];

  return (
    <SignalCard
      title="Solar Flares"
      source="NASA DONKI"
      icon="flare"
      accent="#f59e0b"
      rightSlot={
        <span className="font-metadata text-metadata text-text-muted">
          Live Feed
        </span>
      }
    >
      {isLoading && <LoadingState rows={5} />}
      {isError && <ErrorState message={error?.message} onRetry={refetch} />}
      {!isLoading && !isError && recent.length === 0 && (
        <EmptyState message="No solar flare events in the last 30 days." />
      )}
      {!isLoading && !isError && recent.length > 0 && (
        <div className="space-y-3">
          {recent.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 bg-surface-2 rounded-lg border border-border/50"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded font-telemetry text-telemetry ${classBadgeClass(item.value.classType)}`}
                >
                  {item.value.classType}
                </span>
                <span className="font-body-base text-body-base text-on-surface truncate max-w-[140px]">
                  {item.value.sourceLocation ?? "—"}
                </span>
              </div>
              <time className="font-metadata text-metadata text-text-muted shrink-0">
                {new Date(item.timestamp).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          ))}
        </div>
      )}
    </SignalCard>
  );
}
