import { dogsApi } from "@/apis/dogs/dogsApi";
import { useQuery } from "@tanstack/react-query";

export default function useUserDogs(userName: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["userDogs", userName],
    queryFn: () => dogsApi.getUserDogs(userName),
    enabled: !!userName,
  });

  return { data, isPending, isError };
}
