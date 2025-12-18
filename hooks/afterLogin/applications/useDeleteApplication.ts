"use client";
import {useApplicationState} from "@/stores/applicationsState";
import {useMutation} from "@tanstack/react-query";
import useCheckLoggedIn from "../users/useCheckLoggedIn";
import {ICheckLoggedInType} from "@/types/login/loginDataType";
import {applicationAPI} from "@/apis/applications/applicationAPI";
import {useApplications} from "./useApplications";

export default function useDeleteApplication() {
  const {data} = useCheckLoggedIn();
  const userId = (data?.data as ICheckLoggedInType).userId;
  const {activeTab, selectedIndex, resetSelectedIndex} = useApplicationState();
  const {refreshApplicatinListCache} = useApplications();
  const {mutate, isPending, isError} = useMutation({
    mutationKey: ["deleteApplication", userId],
    mutationFn: async () => {
      if (activeTab !== "pending") {
        console.log("결제하기 클릭");
        return;
      }
      if (selectedIndex.length === 0) {
        alert("취소할 신청을 선택해주세요.");
        return;
      }
      return await applicationAPI.deleteApplication(selectedIndex);
    },
    onSuccess: () => {
      resetSelectedIndex();
      refreshApplicatinListCache();
    },
    retry: false,
  });
  return {mutate, isPending, isError};
}
