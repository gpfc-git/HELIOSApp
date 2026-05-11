// ─── Auth ────────────────────────────────────────────────────────────────────
export const DUMMYJSON_BASE = "https://dummyjson.com";
export const AUTH_URL = `${DUMMYJSON_BASE}/auth/login`;
export const AUTH_ME_URL = `${DUMMYJSON_BASE}/auth/me`;

// ─── NASA ─────────────────────────────────────────────────────────────────────
export const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY ?? "DEMO_KEY";
export const NASA_BASE = "https://api.nasa.gov";
export const DONKI_FLR_URL = `${NASA_BASE}/DONKI/FLR`;
export const DONKI_CME_URL = `${NASA_BASE}/DONKI/CME`;

// ─── NOAA ─────────────────────────────────────────────────────────────────────
export const NOAA_BASE = "https://services.swpc.noaa.gov";
export const SOLAR_WIND_URL = `${NOAA_BASE}/products/solar-wind/plasma-7-day.json`;
export const KP_INDEX_URL = `${NOAA_BASE}/products/noaa-planetary-k-index.json`;

// ─── ISS ──────────────────────────────────────────────────────────────────────
export const ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544";

// ─── Signal Registry ─────────────────────────────────────────────────────────
export const SIGNALS = {
  solar_flare_events: {
    id: "solar_flare_events",
    label: "Solar Flares",
    description: "X-ray bursts from the Sun classified C, M or X by intensity.",
    source: "NASA DONKI",
    unit: "flare class",
    cadence: "~1 hour",
    apiUrl: DONKI_FLR_URL,
    widgetType: "event_feed",
    color: "var(--color-chart-3)",
  },
  coronal_mass_ejections: {
    id: "coronal_mass_ejections",
    label: "Coronal Mass Ejections",
    description:
      "Large expulsions of plasma and magnetic field from the solar corona.",
    source: "NASA DONKI",
    unit: "km/s",
    cadence: "~1 hour",
    apiUrl: DONKI_CME_URL,
    widgetType: "time_chart",
    color: "var(--color-chart-4)",
  },
  solar_wind_speed: {
    id: "solar_wind_speed",
    label: "Solar Wind Speed",
    description: "Speed of plasma streaming from the Sun measured by NOAA.",
    source: "NOAA SWPC",
    unit: "km/s",
    cadence: "~1 minute",
    apiUrl: SOLAR_WIND_URL,
    widgetType: "time_chart",
    color: "var(--color-chart-2)",
  },
  kp_index: {
    id: "kp_index",
    label: "Kp Index",
    description: "Global geomagnetic activity index on a scale of 0 to 9.",
    source: "NOAA SWPC",
    unit: "Kp",
    cadence: "~3 hours",
    apiUrl: KP_INDEX_URL,
    widgetType: "gauge",
    color: "var(--color-chart-1)",
  },
  iss_coordinates: {
    id: "iss_coordinates",
    label: "ISS Position",
    description:
      "Real-time orbital position of the International Space Station.",
    source: "wheretheiss.at",
    unit: "lat/lng",
    cadence: "~5 seconds",
    apiUrl: ISS_URL,
    widgetType: "live",
    color: "var(--color-success)",
  },
};

export const SIGNAL_IDS = Object.keys(SIGNALS);
