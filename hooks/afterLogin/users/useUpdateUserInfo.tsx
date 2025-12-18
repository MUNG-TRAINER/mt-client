import { usersApi } from "@/apis/users/usersApi";
import { UpdateUserInfoType } from "@/schemas/mypageSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useUpdateUserInfo() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateUserInfoType) => usersApi.updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      alert("정보가 성공적으로 수정되었습니다.");
      router.push("/mypage");
    },
    onError: (error) => {
      console.error("사용자 정보 수정 실패:", error);
      alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });
}
