import {loginApi} from "@/apis/login/loginApi";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import {ILoginDataType} from "@/types/login/loginDataType";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function useLogin() {
  const router = useRouter();
  const {forceRefresh, refreshUserCheck} = useCheckLoggedIn();
  const {mutate, isPending, isError, reset} = useMutation({
    mutationKey: ["loginRequest"],
    mutationFn: (data: ILoginDataType) => loginApi.login(data),
    onSuccess: async () => {
      await refreshUserCheck();
      await forceRefresh();
      router.replace("/");
    },
  });
  return {mutate, isPending, isError, reset};
}
