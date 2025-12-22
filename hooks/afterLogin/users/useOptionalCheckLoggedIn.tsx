import {loginApi} from "@/apis/login/loginApi";
import {useQuery} from "@tanstack/react-query";
const ACCESS_TOKEN_TIME = 1000 * 60 * 10;
export default function useOptionalCheckLoggedIn() {
  const {isError} = useQuery({
    queryKey: ["optionalCheck"],
    queryFn: async () => await loginApi.optionalCheck(),
    staleTime: ACCESS_TOKEN_TIME - 30_000,
    refetchInterval: ACCESS_TOKEN_TIME - 30_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });
  return {isError};
}
