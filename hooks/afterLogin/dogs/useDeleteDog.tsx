import { dogsApi } from "@/apis/dogs/dogsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteDog() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (dogId: number) => dogsApi.deleteDog(dogId),
    onSuccess: () => {
      // 반려견 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["myDogs"] });
    },
  });

  return { mutate, mutateAsync, isPending, isError, error };
}
