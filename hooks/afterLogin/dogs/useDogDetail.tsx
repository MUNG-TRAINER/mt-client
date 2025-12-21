import { dogsApi } from "@/apis/dogs/dogsApi";
import { useQuery } from "@tanstack/react-query";

interface UseDogDetailOptions {
  enabled?: boolean;
}

export default function useDogDetail(
  dogId: number,
  options?: UseDogDetailOptions
) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["dogDetail", dogId],
    queryFn: () => dogsApi.getDogDetail(dogId),
    enabled: options?.enabled ?? !!dogId,
  });

  return { data, isPending, isError };
}
