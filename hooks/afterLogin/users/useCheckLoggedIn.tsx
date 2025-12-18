import { loginApi } from "@/apis/login/loginApi";
import {
  ICheckLoggedInType,
  IFailedCheckLoggedInType,
} from "@/types/login/loginDataType";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useCheckLoggedIn() {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery<
    ICheckLoggedInType | IFailedCheckLoggedInType
  >({
    queryKey: ["loggedIn"],
    queryFn: async () => {
      const res = await loginApi.check();
      if (!("userId" in res)) {
        return res as IFailedCheckLoggedInType;
      }
      return res as ICheckLoggedInType;
    },
    retry: false,
  });

  const refreshUserCheck = () => {
    queryClient.invalidateQueries({ queryKey: ["loggedIn"] });
  };
  const resetUserCheck = () => {
    queryClient.removeQueries({ queryKey: ["loggedIn"] });
  };
  const checkIsOwner = (targetId: number | string) => {
    return (
      !!targetId &&
      data &&
      "userId" in data &&
      Number(data.userId) === Number(targetId)
    );
  };

  return {
    data,
    isPending,
    isError,
    refreshUserCheck,
    resetUserCheck,
    checkIsOwner,
  };
}
