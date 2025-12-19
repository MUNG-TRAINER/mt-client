import { usersApi } from "@/apis/users/usersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdatePublicStatus() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (isPublic: boolean) => usersApi.updatePublicStatus(isPublic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return { mutate, mutateAsync, isPending, isError, error };
}
