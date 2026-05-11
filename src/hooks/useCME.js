import { useQuery } from "@tanstack/react-query";
import { fetchCME } from "../lib/fetchers";
import { normalizeCME } from "../lib/normalizers";

export function useCME() {
  return useQuery({
    queryKey: ["cme"],
    queryFn: async () => normalizeCME(await fetchCME()),
    staleTime: 30 * 60 * 1000, // NASA DONKI updates ~hourly
    refetchInterval: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
