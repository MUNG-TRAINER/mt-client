import {loginAPi} from "@/apis/login/loginApi";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export default function useCheckLoggedIn() {
  const queryClient = useQueryClient();
  const {data, isPending, isError} = useQuery({
    queryKey: ["loggedIn"],
    queryFn: () => loginAPi.check(),
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
