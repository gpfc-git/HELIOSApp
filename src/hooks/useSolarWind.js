import { useQuery } from "@tanstack/react-query";
import { fetchSolarWind } from "../lib/fetchers";
import { normalizeSolarWind } from "../lib/normalizers";

export function useSolarWind() {
  return useQuery({
    queryKey: ["solar-wind"],
    queryFn: async () => normalizeSolarWind(await fetchSolarWind()),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000, // NOAA updates ~every minute but we poll every 5
  });
}
