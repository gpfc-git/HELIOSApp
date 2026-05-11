import { useParams, Link, Navigate } from "react-router-dom";
import { SIGNALS } from "../lib/constants";
import { SolarFlareWidget } from "../components/widgets/SolarFlareWidget";
import { CMEWidget } from "../components/widgets/CMEWidget";
import { SolarWindWidget } from "../components/widgets/SolarWindWidget";
import { KpIndexWidget } from "../components/widgets/KpIndexWidget";
import { ISSWidget } from "../components/widgets/ISSWidget";

const WIDGET_MAP = {
  solar_flare_events: SolarFlareWidget,
  coronal_mass_ejections: CMEWidget,
  solar_wind_speed: SolarWindWidget,
  kp_index: KpIndexWidget,
  iss_coordinates: ISSWidget,
};

export function SignalDetailPage() {
  const { id } = useParams();
  const signal = SIGNALS[id];

  if (!signal) return <Navigate to="/signals" replace />;

  const Widget = WIDGET_MAP[id];

  return (
    <div>
      {/* Back link */}
      <div className="mb-6">
        <Link
          to="/signals"
          className="inline-flex items-center gap-2 font-body-base text-body-base text-text-muted hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Back to Catalog
        </Link>
      </div>

      {/* Signal header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-gap mb-8 items-start">
        <div className="lg:col-span-2">
          <h1 className="font-headline-xl text-headline-xl text-text-primary mb-2">
            {signal.label}
          </h1>
          <p className="font-body-base text-body-base text-text-muted max-w-2xl leading-relaxed">
            {signal.description}
          </p>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {[
            { label: "Source", value: signal.source, color: "text-primary" },
            { label: "Unit", value: signal.unit, color: "text-secondary" },
            { label: "Cadence", value: signal.cadence, color: "text-tertiary" },
            { label: "Signal ID", value: signal.id, color: "text-on-surface" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-surface-container p-4">
              <span className="block font-metadata text-metadata text-text-muted uppercase tracking-wider mb-1">
                {label}
              </span>
              <span
                className={`block font-telemetry text-telemetry ${color} truncate`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Widget */}
      <div className="space-y-grid-gap">
        {Widget ? (
          <Widget />
        ) : (
          <p className="font-body-base text-body-base text-text-muted">
            No widget for this signal.
          </p>
        )}

        {/* API endpoint */}
        <div className="bg-surface border border-border rounded-lg p-card-padding flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              api
            </span>
            <h3 className="font-headline-md text-headline-md text-text-primary">
              API Endpoint
            </h3>
          </div>
          <div className="bg-surface-2 border border-border p-3 rounded font-telemetry text-telemetry overflow-hidden">
            <code className="text-primary break-all">{signal.apiUrl}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
