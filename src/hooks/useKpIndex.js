import { useQuery } from "@tanstack/react-query";
import { getKpIndex } from "../services/spaceSignals";

export function useKpIndex() {
  return useQuery({
    queryKey: ["kp-index"],
    queryFn: getKpIndex,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000, // Kp updates every ~3h, check every 5min
  });
}
