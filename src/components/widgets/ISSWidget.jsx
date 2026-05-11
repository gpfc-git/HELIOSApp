import { useISS } from "../../hooks/useISS";
import { SignalCard } from "../ui/SignalCard";
import { LoadingState } from "../states/LoadingState";
import { ErrorState } from "../states/ErrorState";

function CoordRow({ label, value, unit }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
      <span className="font-body-base text-body-base text-text-muted">
        {label}
      </span>
      <span className="font-telemetry text-telemetry text-on-surface">
        {typeof value === "number" ? value.toFixed(4) : value}
        {unit && <span className="text-text-muted ml-1">{unit}</span>}
      </span>
    </div>
  );
}

export function ISSWidget() {
  const { data, isLoading, isError, error, refetch } = useISS();

  return (
    <SignalCard
      title="ISS Position"
      source="wheretheiss.at"
      icon="satellite_alt"
      accent="#22c55e"
      rightSlot={
        <div className="flex items-center gap-3">
          {data && (
            <div className="text-right">
              <div className="font-telemetry text-telemetry text-on-surface">
                {data.value.latitude.toFixed(4)}°,{" "}
                {data.value.longitude.toFixed(4)}°
              </div>
              <div className="font-metadata text-metadata text-text-muted">
                Alt: {data.value.altitude.toFixed(1)} km
              </div>
            </div>
          )}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
          </span>
        </div>
      }
    >
      {isLoading && <LoadingState rows={4} />}
      {isError && <ErrorState message={error?.message} onRetry={refetch} />}
      {!isLoading && !isError && data && (
        <div className="flex flex-col">
          <CoordRow label="Latitude" value={data.value.latitude} unit="°" />
          <CoordRow label="Longitude" value={data.value.longitude} unit="°" />
          <CoordRow
            label="Altitude"
            value={data.value.altitude.toFixed(2)}
            unit="km"
          />
          <CoordRow
            label="Velocity"
            value={`${Math.round(data.value.velocity).toLocaleString()}`}
            unit="km/h"
          />
          <div className="flex items-center justify-between py-1.5">
            <span className="font-body-base text-body-base text-text-muted">
              Visibility
            </span>
            <span
              className={`font-telemetry text-telemetry capitalize ${
                data.value.visibility === "daylight"
                  ? "text-warning"
                  : "text-text-muted"
              }`}
            >
              {data.value.visibility}
            </span>
          </div>
        </div>
      )}
    </SignalCard>
  );
}
