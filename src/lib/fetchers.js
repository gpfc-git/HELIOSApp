import {
  NASA_API_KEY,
  DONKI_FLR_URL,
  DONKI_CME_URL,
  SOLAR_WIND_URL,
  KP_INDEX_URL,
  ISS_URL,
} from "./constants";

async function get(url) {
  const res = await fetch(url);
  if (res.status === 429) {
    throw new Error(
      "NASA API rate limit reached (DEMO_KEY: 30 req/hour). Wait a minute and retry, or set a real API key in .env",
    );
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

// ─── NASA DONKI ───────────────────────────────────────────────────────────────

/** Fetches solar flare events from the last 30 days */
export async function fetchSolarFlares() {
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  return get(`${DONKI_FLR_URL}?startDate=${startDate}&api_key=${NASA_API_KEY}`);
}

/** Fetches coronal mass ejection events from the last 30 days */
export async function fetchCME() {
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  return get(`${DONKI_CME_URL}?startDate=${startDate}&api_key=${NASA_API_KEY}`);
}

// ─── NOAA SWPC ────────────────────────────────────────────────────────────────

/** Fetches 7-day solar wind plasma data */
export async function fetchSolarWind() {
  return get(SOLAR_WIND_URL);
}

/** Fetches planetary Kp index data */
export async function fetchKpIndex() {
  return get(KP_INDEX_URL);
}

// ─── ISS ──────────────────────────────────────────────────────────────────────

/** Fetches current ISS position */
export async function fetchISS() {
  return get(ISS_URL);
}
