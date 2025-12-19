import { usersApi } from "@/apis/users/usersApi";
import { UpdateUserInfoType } from "@/schemas/mypageSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useUpdateUserInfo() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: UpdateUserInfoType) => usersApi.updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/mypage");
    },
  });

  return { mutate, isPending, isError, error };
}
