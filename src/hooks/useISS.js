import { useQuery } from "@tanstack/react-query";
import { fetchISS } from "../lib/fetchers";
import { normalizeISS } from "../lib/normalizers";

export function useISS() {
  return useQuery({
    queryKey: ["iss"],
    queryFn: async () => normalizeISS(await fetchISS()),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000, // wheretheiss.at — poll every 5 minutes
  });
}
