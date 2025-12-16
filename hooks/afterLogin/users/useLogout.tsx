import {loginApi} from "@/apis/login/loginApi";
import {useQuery} from "@tanstack/react-query";

export default function useLogout() {
  const {data, refetch} = useQuery({
    queryKey: ["logout"],
    queryFn: () => loginApi.logout(),
    enabled: false,
  });
  return {data, refetch};
}
