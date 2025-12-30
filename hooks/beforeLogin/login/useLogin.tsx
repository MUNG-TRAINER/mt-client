"use client";
import {fcmApi} from "@/apis/fcm/fcmApi";
import {loginApi} from "@/apis/login/loginApi";
import {useFCM} from "@/components/providers/firebaseProvider/FirebaseProvider";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import {ILoginDataType} from "@/types/login/loginDataType";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function useLogin() {
  const queryClient = useQueryClient();
  const {refreshUserCheck} = useCheckLoggedIn();
  const {token} = useFCM();
  const router = useRouter();
  const {mutate, isPending, isError, reset} = useMutation({
    mutationKey: ["loginRequest"],
    mutationFn: (data: ILoginDataType) => loginApi.login(data),
    onSuccess: async () => {
      await fcmApi.updateFcmToken(token ?? "");
      queryClient.setQueryData(["auth"], {loggedOut: false});
      refreshUserCheck();
      router.replace("/");
    },
  });
  return {mutate, isPending, isError, reset};
}
