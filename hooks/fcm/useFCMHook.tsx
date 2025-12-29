"use client";

import {fcmApi} from "@/apis/fcm/fcmApi";
import {usersApi} from "@/apis/users/usersApi";
import {IFirebaseSendMsgHookTypes} from "@/types/firebaseMsg/IFirebaseMsgTypes";
import {useMutation, useQuery} from "@tanstack/react-query";

export default function useFCMHook({targetId}: {targetId: number}) {
  const {data: token} = useQuery({
    queryKey: ["getUserFCMToken", targetId],
    queryFn: async (): Promise<string> =>
      await usersApi.getUserFCMToken(targetId),
    retry: false,
  });
  const {mutate, isPending, isError} = useMutation({
    mutationKey: ["sendFCMMsg"],
    mutationFn: async ({
      userId,
      title,
      desc,
      url,
      msgBody,
    }: IFirebaseSendMsgHookTypes) => {
      await fcmApi.sendFCMMsg({
        userId,
        title,
        desc,
        url,
        msgBody,
        token: token + "",
      });
    },
  });
  return {token, mutate, isPending, isError};
}
