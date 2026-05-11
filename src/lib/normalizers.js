// Unified signal shape:
// { timestamp, source, signal, value, unit, confidence, metadata? }

// ─── Solar Flares ─────────────────────────────────────────────────────────────

export function normalizeSolarFlares(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => ({
    timestamp: item.beginTime ?? item.peakTime ?? new Date().toISOString(),
    source: "NASA_DONKI",
    signal: "solar_flare_events",
    value: {
      classType: item.classType ?? "Unknown",
      beginTime: item.beginTime,
      peakTime: item.peakTime,
      endTime: item.endTime,
      sourceLocation: item.sourceLocation ?? "N/A",
    },
    unit: "flare_class",
    confidence: 0.95,
  }));
}

// ─── CME ──────────────────────────────────────────────────────────────────────

export function normalizeCME(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const analysis = item.cmeAnalyses?.[0];
      return {
        timestamp: item.startTime ?? new Date().toISOString(),
        source: "NASA_DONKI",
        signal: "coronal_mass_ejections",
        value: {
          speed: analysis?.speed ?? null,
          type: analysis?.type ?? "Unknown",
          note: item.note ?? "",
        },
        unit: "km/s",
        confidence: analysis ? 0.9 : 0.5,
      };
    })
    .filter((item) => item.value.speed !== null);
}

// ─── Solar Wind ───────────────────────────────────────────────────────────────
// NOAA format: array of arrays — first row is headers
// [time_tag, density, speed, temperature]

export function normalizeSolarWind(raw) {
  if (!Array.isArray(raw) || raw.length < 2) return [];
  const [, ...rows] = raw;
  return rows
    .filter((row) => row[2] !== null && row[2] !== "-9999.9")
    .slice(-100) // last 100 readings
    .map((row) => ({
      timestamp: row[0],
      source: "NOAA_SWPC",
      signal: "solar_wind_speed",
      value: {
        speed: parseFloat(row[2]),
        density: parseFloat(row[1]),
        temperature: parseFloat(row[3]),
      },
      unit: "km/s",
      confidence: 1.0,
    }));
}

// ─── Kp Index ─────────────────────────────────────────────────────────────────
// NOAA format: array of objects
// { time_tag, Kp, a_running, station_count }

export function normalizeKpIndex(raw) {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return raw
    .filter((item) => item.Kp != null)
    .slice(-40) // last 40 readings (~5 days)
    .map((item) => ({
      timestamp: item.time_tag,
      source: "NOAA_SWPC",
      signal: "kp_index",
      value: { kp: item.Kp },
      unit: "Kp",
      confidence: 1.0,
    }));
}

// ─── ISS ──────────────────────────────────────────────────────────────────────

export function normalizeISS(raw) {
  return {
    timestamp: new Date(raw.timestamp * 1000).toISOString(),
    source: "wheretheiss.at",
    signal: "iss_coordinates",
    value: {
      latitude: raw.latitude,
      longitude: raw.longitude,
      altitude: raw.altitude,
      velocity: raw.velocity,
      visibility: raw.visibility,
    },
    unit: "lat/lng",
    confidence: 1.0,
  };
}
