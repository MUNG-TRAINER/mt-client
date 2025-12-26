"use client";
import {sessionApi} from "@/apis/session/sessionApi";
import {useSessionState} from "@/stores/session/sessionState";
import {useMutation} from "@tanstack/react-query";

interface IEditSessionMutationType {
  courseId: string;
  sessionId: string;
  formData: FormData;
}
export default function useEditSession({sessionId}: {sessionId: string}) {
  const {setEditModeOff} = useSessionState();
  const {mutate, isError, isPending} = useMutation({
    mutationKey: ["editSession", sessionId],
    mutationFn: async ({
      courseId,
      sessionId,
      formData,
    }: IEditSessionMutationType) =>
      await sessionApi.editSession({courseId, sessionId, formData}),
    onSuccess: () => {
      setEditModeOff();
    },
  });
  return {mutate, isError, isPending};
}
