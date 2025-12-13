import {loginAPi} from "@/apis/login/loginApi";
import {ILoginDataType} from "@/types/login/loginDataType";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function useLogin() {
  const router = useRouter();
  const {mutate, isPending, isError, reset} = useMutation({
    mutationKey: ["loginRequest"],
    mutationFn: (data: ILoginDataType) => loginAPi.login(data),
    onSuccess: () => {
      router.replace("/");
    },
  });
  return {mutate, isPending, isError, reset};
}
