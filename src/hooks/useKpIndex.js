import { useQuery } from "@tanstack/react-query";
import { fetchKpIndex } from "../lib/fetchers";
import { normalizeKpIndex } from "../lib/normalizers";

export function useKpIndex() {
  return useQuery({
    queryKey: ["kp-index"],
    queryFn: async () => normalizeKpIndex(await fetchKpIndex()),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000, // Kp updates every ~3h, check every 5min
  });
}
