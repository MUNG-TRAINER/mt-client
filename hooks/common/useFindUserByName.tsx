import {usersApi} from "@/apis/users/usersApi";
import {useQuery} from "@tanstack/react-query";

export default function useFindUserByName({userName}: {userName: string}) {
  const {data, refetch} = useQuery({
    queryKey: ["findUserByName", userName],
    queryFn: async () => await usersApi.findUserByName(userName),
    staleTime: 0,
    retry: false,
  });
  return {data, refetch};
}
