import { SolarFlareWidget } from "../components/widgets/SolarFlareWidget";
import { CMEWidget } from "../components/widgets/CMEWidget";
import { SolarWindWidget } from "../components/widgets/SolarWindWidget";
import { KpIndexWidget } from "../components/widgets/KpIndexWidget";
import { ISSWidget } from "../components/widgets/ISSWidget";

export function DashboardPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline-xl text-headline-xl text-on-surface">
          Dashboard
        </h1>
        <p className="font-body-base text-body-base text-text-muted mt-1">
          Real-time solar activity and geophysical monitoring station
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-gap">
        <SolarFlareWidget />
        <SolarWindWidget />
        <KpIndexWidget />
        <CMEWidget />
        <ISSWidget />
      </div>

      {/* Secondary status row */}
      <div className="mt-grid-gap grid grid-cols-1 md:grid-cols-3 gap-grid-gap">
        <div className="bg-surface-container-low border border-border rounded-xl p-card-padding flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="font-metadata text-metadata text-text-muted uppercase tracking-wider">
              Synchronization
            </span>
            <span className="font-telemetry text-telemetry text-on-surface">
              Live · NOAA + NASA feeds
            </span>
          </div>
          <span className="material-symbols-outlined text-primary text-[20px]">
            sync
          </span>
        </div>
        <div className="bg-surface-container-low border border-border rounded-xl p-card-padding flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="font-metadata text-metadata text-text-muted uppercase tracking-wider">
              Data Integrity
            </span>
            <span className="font-telemetry text-telemetry text-success">
              SSL/TLS Encrypted
            </span>
          </div>
          <span className="material-symbols-outlined text-success text-[20px]">
            verified_user
          </span>
        </div>
        <div className="bg-surface-container-low border border-border rounded-xl p-card-padding flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="font-metadata text-metadata text-text-muted uppercase tracking-wider">
              Station Status
            </span>
            <span className="font-telemetry text-telemetry text-success">
              HELIOS-1 ONLINE
            </span>
          </div>
          <span className="material-symbols-outlined text-success text-[20px]">
            settings_input_antenna
          </span>
        </div>
      </div>
    </div>
  );
}
