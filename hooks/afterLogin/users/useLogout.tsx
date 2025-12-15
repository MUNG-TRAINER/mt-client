import {loginAPi} from "@/apis/login/loginApi";
import {useQuery} from "@tanstack/react-query";

export default function useLogout() {
  const {data, refetch} = useQuery({
    queryKey: ["logout"],
    queryFn: () => loginAPi.logout(),
    enabled: false,
  });
  return {data, refetch};
}
