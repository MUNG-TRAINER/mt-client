import {joinApi} from "@/apis/join/joinApi";
import {useQuery} from "@tanstack/react-query";

export default function useCheckEmail(email: string) {
  const {data, isSuccess, isError, isPending, refetch} = useQuery({
    queryKey: ["checkEmail", email],
    queryFn: () => joinApi.checkEmail(email),
  });
  return {data, isSuccess, isError, isPending, refetch};
}
