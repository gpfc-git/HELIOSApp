import { useQuery } from "@tanstack/react-query";
import { getCME } from "../services/spaceSignals";

export function useCME() {
  return useQuery({
    queryKey: ["cme"],
    queryFn: getCME,
    staleTime: 30 * 60 * 1000, // NASA DONKI updates ~hourly
    refetchInterval: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
