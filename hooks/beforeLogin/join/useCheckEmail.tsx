import {joinApi} from "@/apis/join/joinApi";
import {useQuery} from "@tanstack/react-query";

export default function useCheckEmail(email: string) {
  const {data, isSuccess, isError, isPending, refetch} = useQuery({
    queryKey: ["checkUserName", email],
    queryFn: () => joinApi.checkUserName(email),
    enabled: false,
  });
  return {data, isSuccess, isError, isPending, refetch};
}
