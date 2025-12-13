import {joinApi} from "@/apis/join/joinApi";
import {useQuery} from "@tanstack/react-query";

export default function useCheckUserName(userName: string) {
  const {data, isSuccess, isError, isPending, refetch} = useQuery({
    queryKey: ["checkUserName", userName],
    queryFn: () => joinApi.checkUserName(userName),
  });
  return {data, isSuccess, isError, isPending, refetch};
}
