import {
  fetchCME,
  fetchISS,
  fetchKpIndex,
  fetchSolarFlares,
  fetchSolarWind,
} from "../lib/fetchers";
import {
  normalizeCME,
  normalizeISS,
  normalizeKpIndex,
  normalizeSolarFlares,
  normalizeSolarWind,
} from "../lib/normalizers";

export async function getSolarFlares() {
  return normalizeSolarFlares(await fetchSolarFlares());
}

export async function getCME() {
  return normalizeCME(await fetchCME());
}

export async function getSolarWind() {
  return normalizeSolarWind(await fetchSolarWind());
}

export async function getKpIndex() {
  return normalizeKpIndex(await fetchKpIndex());
}

export async function getISS() {
  return normalizeISS(await fetchISS());
}
