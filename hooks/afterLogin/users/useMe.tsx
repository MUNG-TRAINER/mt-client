import {usersApi} from "@/apis/users/usersApi";
import {useQuery} from "@tanstack/react-query";

export default function useMe() {
  const {data, isPending, isError} = useQuery({
    queryKey: ["me"],
    queryFn: () => usersApi.me(),
    retry: false,
  });
  return {data, isPending, isError};
}
