import { dogsApi } from "@/apis/dogs/dogsApi";
import { useQuery } from "@tanstack/react-query";

export default function useMyDogs() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["myDogs"],
    queryFn: () => dogsApi.getMyDogs(),
  });

  return { data, isPending, isError, refetch };
}
