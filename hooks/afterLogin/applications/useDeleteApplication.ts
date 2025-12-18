"use client";
import {useApplicationState} from "@/stores/applicationsState";
import {useMutation} from "@tanstack/react-query";
import useCheckLoggedIn from "../users/useCheckLoggedIn";
import {applicationAPI} from "@/apis/applications/applicationAPI";
import {useApplications} from "./useApplications";

export default function useDeleteApplication() {
  let userId: number | undefined;
  const {data} = useCheckLoggedIn();
  if (data && "userId" in data) {
    userId = data.userId;
  }
  const {activeTab, selectedIndex, resetSelectedIndex} = useApplicationState();
  const {refreshApplicationListCache} = useApplications();
  const {mutate, isPending, isError} = useMutation({
    mutationKey: ["deleteApplication", userId],
    mutationFn: async (data: number[]) => {
      if (activeTab !== "pending") {
        console.log("결제하기 클릭");
        return;
      }
      if (selectedIndex.length === 0) {
        alert("취소할 신청을 선택해주세요.");
        return;
      }
      return await applicationAPI.deleteApplication(data);
    },
    onSuccess: () => {
      resetSelectedIndex();
      refreshApplicationListCache();
    },
    retry: false,
  });
  return {mutate, isPending, isError};
}
