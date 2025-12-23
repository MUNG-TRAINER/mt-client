import {loginApi} from "@/apis/login/loginApi";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import {ILoginDataType} from "@/types/login/loginDataType";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function useLogin() {
  const router = useRouter();
  const {forceRefresh, resetUserCheck} = useCheckLoggedIn();
  const {mutate, isPending, isError, reset} = useMutation({
    mutationKey: ["loginRequest"],
    mutationFn: (data: ILoginDataType) => loginApi.login(data),
    onSuccess: async () => {
      // 기존 캐시를 완전히 제거하고 새로 페칭
      resetUserCheck();
      await forceRefresh();
      // 약간의 딜레이를 추가하여 상태가 안정화되도록 함
      setTimeout(() => {
        router.replace("/");
      }, 100);
    },
  });
  return {mutate, isPending, isError, reset};
}
