import { useQuery } from "@tanstack/react-query";
import { getSolarFlares } from "../services/spaceSignals";

export function useSolarFlares() {
  return useQuery({
    queryKey: ["solar-flares"],
    queryFn: getSolarFlares,
    staleTime: 30 * 60 * 1000, // NASA DONKI updates ~hourly
    refetchInterval: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
