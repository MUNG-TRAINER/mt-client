"use client";

import {fcmApi} from "@/apis/fcm/fcmApi";
import {usersApi} from "@/apis/users/usersApi";
import {IFirebaseSendMsgHookTypes} from "@/types/firebaseMsg/IFirebaseMsgTypes";
import {useMutation} from "@tanstack/react-query";

export default function useFCMHook() {
  const {mutate, isPending, isError} = useMutation({
    mutationKey: ["sendFCMMsg"],
    mutationFn: async ({
      targetId,
      userId,
      title,
      desc,
      url,
      msgBody,
    }: IFirebaseSendMsgHookTypes) => {
      const targetFCMToken = await usersApi.getUserFCMToken(targetId);
      await fcmApi.sendFCMMsg({
        userId,
        title,
        desc,
        url,
        msgBody,
        token: targetFCMToken,
      });
    },
  });
  return {mutate, isPending, isError};
}
