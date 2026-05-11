import { useCME } from "../../hooks/useCME";
import { SignalCard } from "../ui/SignalCard";
import { TimeChart } from "../charts/TimeChart";
import { LoadingState } from "../states/LoadingState";
import { ErrorState } from "../states/ErrorState";
import { EmptyState } from "../states/EmptyState";

export function CMEWidget() {
  const { data, isLoading, isError, error, refetch } = useCME();

  return (
    <SignalCard
      title="Coronal Mass Ejection"
      source="NASA DONKI"
      icon="cyclone"
      accent="#ec4899"
      rightSlot={
        <span className="font-telemetry text-telemetry text-chart-cme">
          {data && data.length > 0 ? "Alert: Active" : "Monitoring"}
        </span>
      }
    >
      {isLoading && <LoadingState rows={6} />}
      {isError && <ErrorState message={error?.message} onRetry={refetch} />}
      {!isLoading && !isError && (!data || data.length === 0) && (
        <EmptyState message="No CME events in the last 30 days." />
      )}
      {!isLoading && !isError && data && data.length > 0 && (
        <TimeChart
          data={data}
          dataKey="speed"
          unit="km/s"
          label="Ejection Speed"
          color="#ec4899"
        />
      )}
    </SignalCard>
  );
}
