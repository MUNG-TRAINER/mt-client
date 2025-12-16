import {loginApi} from "@/apis/login/loginApi";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const ACCESS_TOKEN_EXPIRE_TIME = 10 * 60 * 1000;

export default function useCheckLoggedIn() {
  const queryClient = useQueryClient();
  const {data, isPending, isError} = useQuery({
    queryKey: ["loggedIn"],
    queryFn: () => loginApi.check(),
    staleTime: ACCESS_TOKEN_EXPIRE_TIME - 30_000,
    refetchInterval: ACCESS_TOKEN_EXPIRE_TIME - 30_000,
    retry: false,
  });
  const refreshUserCheck = () => {
    queryClient.invalidateQueries({queryKey: ["loggedIn"]});
  };
  const resetUserCheck = () => {
    queryClient.removeQueries({queryKey: ["loggedIn"]});
  };
  return {data, isPending, isError, refreshUserCheck, resetUserCheck};
}
