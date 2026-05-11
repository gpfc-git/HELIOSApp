export function AdminPage() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("helios_user") ?? "null");
    } catch {
      return null;
    }
  })();

  const apiSources = [
    {
      label: "NASA DONKI",
      key: import.meta.env.VITE_NASA_API_KEY ? "●●●●●●●●●●●●" : "DEMO_KEY",
    },
    { label: "NOAA SWPC", key: "Public — no key required" },
    { label: "wheretheiss.at", key: "Public — no key required" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface">
          Admin Panel
        </h1>
        <p className="mt-1 font-body-base text-body-base text-text-muted">
          Restricted access — administrators only
        </p>
      </div>

      {/* Session info */}
      <div className="bg-surface border border-border rounded-xl p-card-padding flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <span className="material-symbols-outlined text-[20px] text-primary">
            admin_panel_settings
          </span>
          <span className="font-body-base text-body-base text-text-primary font-semibold">
            Active Session
          </span>
          <span
            className="ml-auto text-xs px-2 py-0.5 rounded-full border font-mono"
            style={{
              color: "#22c55e",
              borderColor: "#22c55e",
              background: "rgba(34,197,94,0.1)",
            }}
          >
            admin
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Username", value: user?.username },
            { label: "First Name", value: user?.firstName },
            { label: "User ID", value: user?.id != null ? `#${user.id}` : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-surface-2 rounded-lg p-3">
              <p className="text-text-muted font-body-base text-xs">{label}</p>
              <p className="text-on-surface font-mono text-sm mt-0.5">
                {value ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* API configuration */}
      <div className="bg-surface border border-border rounded-xl p-card-padding flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <span className="material-symbols-outlined text-[20px] text-primary">
            key
          </span>
          <span className="font-body-base text-body-base text-text-primary font-semibold">
            API Configuration
          </span>
        </div>
        <div className="flex flex-col">
          {apiSources.map(({ label, key }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3 border-b border-border/40 last:border-0"
            >
              <div>
                <p className="font-body-base text-body-base text-on-surface">
                  {label}
                </p>
                <p className="font-mono text-xs text-text-muted mt-0.5">
                  {key}
                </p>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-mono"
                style={{
                  color: "#22c55e",
                  background: "rgba(34,197,94,0.1)",
                }}
              >
                active
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Signal registry */}
      <div className="bg-surface border border-border rounded-xl p-card-padding flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <span className="material-symbols-outlined text-[20px] text-primary">
            settings_input_antenna
          </span>
          <span className="font-body-base text-body-base text-text-primary font-semibold">
            Signal Registry
          </span>
          <span className="ml-auto font-mono text-xs text-text-muted">
            5 signals
          </span>
        </div>
        <div className="flex flex-col">
          {[
            {
              id: "solar_flare_events",
              source: "NASA DONKI",
              cadence: "~1 hour",
              color: "#f59e0b",
            },
            {
              id: "coronal_mass_ejections",
              source: "NASA DONKI",
              cadence: "~1 hour",
              color: "#ec4899",
            },
            {
              id: "solar_wind_speed",
              source: "NOAA SWPC",
              cadence: "~1 minute",
              color: "#22d3ee",
            },
            {
              id: "kp_index",
              source: "NOAA SWPC",
              cadence: "~3 hours",
              color: "#6366f1",
            },
            {
              id: "iss_coordinates",
              source: "wheretheiss.at",
              cadence: "~5 minutes",
              color: "#22c55e",
            },
          ].map(({ id, source, cadence, color }) => (
            <div
              key={id}
              className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                <span className="font-mono text-xs text-on-surface">{id}</span>
              </div>
              <div className="text-right">
                <p className="font-body-base text-xs text-text-muted">
                  {source}
                </p>
                <p className="font-mono text-xs text-text-muted">{cadence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
