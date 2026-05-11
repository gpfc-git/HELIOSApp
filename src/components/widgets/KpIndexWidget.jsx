import { useKpIndex } from "../../hooks/useKpIndex";
import { SignalCard } from "../ui/SignalCard";
import { Gauge } from "../charts/Gauge";
import { LoadingState } from "../states/LoadingState";
import { ErrorState } from "../states/ErrorState";
import { EmptyState } from "../states/EmptyState";

export function KpIndexWidget() {
  const { data, isLoading, isError, error, refetch } = useKpIndex();
  const latest = data?.[data.length - 1];

  return (
    <SignalCard
      title="Kp Index"
      source="NOAA SWPC"
      icon="explore"
      accent="#6366f1"
      rightSlot={
        <span className="font-metadata text-metadata text-text-muted">
          Planetary Magnetic Field
        </span>
      }
    >
      {isLoading && <LoadingState rows={4} />}
      {isError && <ErrorState message={error?.message} onRetry={refetch} />}
      {!isLoading && !isError && !latest && (
        <EmptyState message="No Kp index data available." />
      )}
      {!isLoading && !isError && latest && (
        <Gauge value={latest.value.kp} max={9} unit="Kp" />
      )}
    </SignalCard>
  );
}
