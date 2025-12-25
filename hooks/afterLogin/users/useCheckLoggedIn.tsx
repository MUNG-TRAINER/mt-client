"use client";
import {loginApi} from "@/apis/login/loginApi";
import {
  ICheckLoggedInType,
  IFailedCheckLoggedInType,
} from "@/types/login/loginDataType";
import {useQuery, useQueryClient} from "@tanstack/react-query";
const ACCESS_TOKEN_TIME = 1000 * 60 * 10;
export default function useCheckLoggedIn() {
  const queryClient = useQueryClient();
  const authState = queryClient.getQueryData<{loggedOut?: boolean}>(["auth"]);
  const isLoggedOut = authState?.loggedOut === true;
  const {data, isPending, isError} = useQuery<
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
    staleTime: ACCESS_TOKEN_TIME - 30_000,
    gcTime: ACCESS_TOKEN_TIME * 2,
    enabled: !isLoggedOut,
    refetchInterval: isLoggedOut ? false : ACCESS_TOKEN_TIME - 30_000,
    retry: false,
  });

  const refreshUserCheck = async () => {
    await queryClient.invalidateQueries({queryKey: ["loggedIn"]});
  };
  const resetUserCheck = () => {
    queryClient.removeQueries({queryKey: ["loggedIn"]});
  };
  const forceRefresh = async () => {
    // 강제 refetch
    await queryClient.refetchQueries({queryKey: ["loggedIn"]});
  };
  const checkIsOwner = (targetId: number | string) => {
    return (
      !!targetId &&
      data &&
      "userId" in data &&
      Number(data.userId) === Number(targetId)
    );
  };
  const role = isLoggedOut ? null : data && "role" in data ? data.role : null;
  return {
    data,
    isPending,
    isError,
    role,
    refreshUserCheck,
    resetUserCheck,
    forceRefresh,
    checkIsOwner,
  };
}
