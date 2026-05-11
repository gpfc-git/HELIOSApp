import { Link } from "react-router-dom";
import { SIGNALS } from "../lib/constants";

const SIGNAL_ICONS = {
  solar_flare_events: { icon: "flare", accent: "#f59e0b" },
  coronal_mass_ejections: { icon: "cyclone", accent: "#ec4899" },
  solar_wind_speed: { icon: "air", accent: "#22d3ee" },
  kp_index: { icon: "public", accent: "#6366f1" },
  iss_coordinates: { icon: "satellite_alt", accent: "#22c55e" },
};

const WIDGET_BADGE = {
  event_feed: "Event Feed",
  time_chart: "Chart",
  gauge: "Gauge",
  live: "Live",
};

export function SignalCatalogPage() {
  const signals = Object.values(SIGNALS);

  return (
    <div>
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="font-telemetry text-metadata text-success tracking-widest uppercase">
            System Online
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight">
          Signal Catalog
        </h1>
        <p className="font-body-base text-body-base text-text-muted mt-2">
          {signals.length} real-time geophysical and heliophysical data streams
        </p>
      </header>

      <div className="space-y-3">
        {signals.map((signal) => {
          const meta = SIGNAL_ICONS[signal.id] ?? {
            icon: "sensors",
            accent: "#c0c1ff",
          };
          const badgeLabel =
            WIDGET_BADGE[signal.widgetType] ?? signal.widgetType;
          return (
            <Link
              key={signal.id}
              to={`/signals/${signal.id}`}
              className="group flex flex-col md:flex-row items-center gap-6 p-4 bg-surface-container rounded-lg border border-border hover:border-primary transition-all duration-200 cursor-pointer"
            >
              <div
                className="w-12 h-12 shrink-0 flex items-center justify-center bg-accent-dim rounded-lg border"
                style={{ color: meta.accent, borderColor: `${meta.accent}33` }}
              >
                <span className="material-symbols-outlined text-[28px]">
                  {meta.icon}
                </span>
              </div>

              <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="col-span-1">
                  <h3 className="font-headline-md text-headline-md text-text-primary">
                    {signal.label}
                  </h3>
                  <span
                    className="inline-block mt-1 px-2 py-0.5 rounded font-telemetry text-axis-ticks uppercase tracking-wider"
                    style={{
                      background: `${meta.accent}26`,
                      color: meta.accent,
                    }}
                  >
                    {badgeLabel}
                  </span>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <p className="font-body-base text-body-base text-text-muted line-clamp-1">
                    {signal.description}
                  </p>
                </div>

                <div className="flex flex-col items-end md:items-start">
                  <span className="font-telemetry text-metadata text-text-muted uppercase">
                    Source
                  </span>
                  <span className="font-telemetry text-telemetry text-on-surface">
                    {signal.source}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end w-28 shrink-0">
                <span className="font-telemetry text-metadata text-text-muted uppercase">
                  Cadence
                </span>
                <span className="font-telemetry text-telemetry text-primary">
                  {signal.cadence}
                </span>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-primary">
                  chevron_right
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer status bar */}
      <footer className="mt-12 border-t border-border pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-2 p-4 rounded border border-border flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <div>
            <p className="font-telemetry text-metadata text-text-muted uppercase">
              Synchronization
            </p>
            <p className="font-telemetry text-telemetry text-on-surface">
              Live feeds active
            </p>
          </div>
        </div>
        <div className="bg-surface-2 p-4 rounded border border-border flex items-center gap-4">
          <span className="material-symbols-outlined text-success">
            verified_user
          </span>
          <div>
            <p className="font-telemetry text-metadata text-text-muted uppercase">
              Data Integrity
            </p>
            <p className="font-telemetry text-telemetry text-on-surface">
              SSL/TLS Encrypted
            </p>
          </div>
        </div>
        <div className="bg-surface-2 p-4 rounded border border-border flex items-center gap-4">
          <span className="material-symbols-outlined text-warning">
            database
          </span>
          <div>
            <p className="font-telemetry text-metadata text-text-muted uppercase">
              Archive Status
            </p>
            <p className="font-telemetry text-telemetry text-on-surface">
              HELIOS-1 Active
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
