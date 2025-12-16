import { dogsApi } from "@/apis/dogs/dogsApi";
import { IDogUpdateRequestType } from "@/types/dog/dogType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateDog() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({
      dogId,
      dogData,
    }: {
      dogId: number;
      dogData: IDogUpdateRequestType;
    }) => dogsApi.updateDog(dogId, dogData),
    onSuccess: (_, { dogId }) => {
      // 반려견 목록 및 상세 정보 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["myDogs"] });
      queryClient.invalidateQueries({ queryKey: ["dogDetail", dogId] });
    },
  });

  return { mutate, mutateAsync, isPending, isError, error };
}
