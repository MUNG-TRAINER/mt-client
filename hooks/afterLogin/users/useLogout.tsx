"use client";
import {loginApi} from "@/apis/login/loginApi";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => loginApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["auth"], {loggedOut: true});
      queryClient.setQueryData(["loggedIn"], undefined);
      queryClient.removeQueries({queryKey: ["loggedIn"]});
      queryClient.clear();
      router.refresh();
    },
  });
  return {mutate};
}
