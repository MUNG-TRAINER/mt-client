import { dogsApi } from "@/apis/dogs/dogsApi";
import { IDogCreateRequestType } from "@/types/dog/dogType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateDog() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (dogData: IDogCreateRequestType) => dogsApi.createDog(dogData),
    onSuccess: () => {
      // 반려견 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["myDogs"] });
    },
  });

  return { mutate, mutateAsync, isPending, isError, error };
}
