import { useQuery } from "@tanstack/react-query";
import { getISS } from "../services/spaceSignals";

export function useISS() {
  return useQuery({
    queryKey: ["iss"],
    queryFn: getISS,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000, // wheretheiss.at — poll every 5 minutes
  });
}
