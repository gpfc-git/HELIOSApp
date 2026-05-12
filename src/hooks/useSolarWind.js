import { useQuery } from "@tanstack/react-query";
import { getSolarWind } from "../services/spaceSignals";

export function useSolarWind() {
  return useQuery({
    queryKey: ["solar-wind"],
    queryFn: getSolarWind,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000, // NOAA updates ~every minute but we poll every 5
  });
}
