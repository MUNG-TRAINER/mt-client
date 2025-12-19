import { usersApi } from "@/apis/users/usersApi";
import { ChangePasswordType } from "@/schemas/passwordSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useChangePassword() {
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: ChangePasswordType) => usersApi.changePassword(data),
    onSuccess: () => {
      router.push("/mypage");
    },
  });

  return { mutate, isPending, isError, error };
}
