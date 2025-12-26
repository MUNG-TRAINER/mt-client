"use client";
import {loginApi} from "@/apis/login/loginApi";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import {ILoginDataType} from "@/types/login/loginDataType";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {refreshUserCheck} = useCheckLoggedIn();
  const {mutate, isPending, isError, reset} = useMutation({
    mutationKey: ["loginRequest"],
    mutationFn: (data: ILoginDataType) => loginApi.login(data),
    onSuccess: async () => {
      queryClient.setQueryData(["auth"], {loggedOut: false});
      refreshUserCheck();
      setTimeout(() => {
        router.replace("/");
      }, 100);
    },
  });
  return {mutate, isPending, isError, reset};
}
