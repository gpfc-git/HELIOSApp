import { useSolarWind } from "../../hooks/useSolarWind";
import { SignalCard } from "../ui/SignalCard";
import { TimeChart } from "../charts/TimeChart";
import { LoadingState } from "../states/LoadingState";
import { ErrorState } from "../states/ErrorState";
import { EmptyState } from "../states/EmptyState";

export function SolarWindWidget() {
  const { data, isLoading, isError, error, refetch } = useSolarWind();
  const latest = data?.[data.length - 1];

  return (
    <SignalCard
      title="Solar Wind Speed"
      source="NOAA SWPC"
      icon="airwave"
      accent="#22d3ee"
      rightSlot={
        latest && (
          <div className="text-right">
            <div className="font-telemetry text-telemetry text-chart-wind">
              {latest.value.speed.toFixed(0)} km/s
            </div>
            <div className="font-metadata text-metadata text-text-muted">
              Density: {latest.value.density.toFixed(1)} p/cm³
            </div>
          </div>
        )
      }
    >
      {isLoading && <LoadingState rows={6} />}
      {isError && <ErrorState message={error?.message} onRetry={refetch} />}
      {!isLoading && !isError && (!data || data.length === 0) && (
        <EmptyState message="No solar wind data available." />
      )}
      {!isLoading && !isError && data && data.length > 0 && (
        <TimeChart
          data={data}
          dataKey="speed"
          unit="km/s"
          label="Wind Speed"
          color="#22d3ee"
        />
      )}
    </SignalCard>
  );
}
