"use client";

import {fcmApi} from "@/apis/fcm/fcmApi";
import {usersApi} from "@/apis/users/usersApi";
import {IFirebaseSendMsgHookTypes} from "@/types/firebaseMsg/IFirebaseMsgTypes";
import {useMutation, useQuery} from "@tanstack/react-query";

export default function useFindTokenByName({
  userName,
  enabled,
}: {
  userName: string;
  enabled: boolean;
}) {
  const {data: token} = useQuery({
    queryKey: ["getUserFCMToken", userName],
    queryFn: async (): Promise<string> =>
      await usersApi.getUserFCMTokenByUserName(userName + ""),
    enabled,
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
        token: token ?? "",
      });
    },
  });
  return {token, mutate, isPending, isError};
}
