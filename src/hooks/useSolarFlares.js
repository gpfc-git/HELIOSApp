import { useQuery } from "@tanstack/react-query";
import { fetchSolarFlares } from "../lib/fetchers";
import { normalizeSolarFlares } from "../lib/normalizers";

export function useSolarFlares() {
  return useQuery({
    queryKey: ["solar-flares"],
    queryFn: async () => normalizeSolarFlares(await fetchSolarFlares()),
    staleTime: 30 * 60 * 1000, // NASA DONKI updates ~hourly
    refetchInterval: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
