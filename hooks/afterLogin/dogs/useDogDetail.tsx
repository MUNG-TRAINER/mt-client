import { dogsApi } from "@/apis/dogs/dogsApi";
import { useQuery } from "@tanstack/react-query";

export default function useDogDetail(dogId: number) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["dogDetail", dogId],
    queryFn: () => dogsApi.getDogDetail(dogId),
    enabled: !!dogId,
  });

  return { data, isPending, isError };
}
