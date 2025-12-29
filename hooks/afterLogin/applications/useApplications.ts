"use client";

import { ApplicationType } from "@/types/applications/applicationsType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationAPI } from "@/apis/applications/applicationAPI";
import { useApplicationState } from "@/stores/applicationsState";

export const useApplications = () => {
  const { activeTab, selectedIndex } = useApplicationState();
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery<ApplicationType[]>({
    queryKey: ["applicationList"],
    queryFn: () => applicationAPI.getApplicationList(),
  });

  const pendingApplications =
    data?.filter((app) => {
      // 모든 세션이 승인 대기 상태인 과정만 필터링
      const allStatuses = app.applicationItems.map(
        (item) => item.applicationStatus
      );
      return allStatuses.every(
        (status) =>
          status === "APPLIED" ||
          status === "WAITING" ||
          status === "COUNSELING_REQUIRED"
      );
    }) || [];

  const completedApplications =
    data?.filter((app) => {
      // 최소 하나의 세션이라도 완료/승인/거절/취소 상태인 과정
      const allStatuses = app.applicationItems.map(
        (item) => item.applicationStatus
      );
      return allStatuses.some(
        (status) =>
          status === "ACCEPT" ||
          status === "PAID" ||
          status === "REJECTED" ||
          status === "CANCELLED" ||
          status === "EXPIRED"
      );
    }) || [];

  const applicationsToShow =
    activeTab === "pending" ? pendingApplications : completedApplications;

  const refreshApplicationListCache = () => {
    queryClient.invalidateQueries({ queryKey: ["applicationList"] });
  };

  const thisWeekSchedule = data?.filter((app) => {
    const now = new Date();
    const startDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const dayAfterWeek = startDay + 7 * 24 * 60 * 60 * 1000; // 1000으로 수정 (밀리초)

    // 첫 번째 세션의 일정을 기준으로 판단
    return app.applicationItems.some((item) => {
      try {
        const scheduleTime = new Date(item.sessionSchedule).getTime();
        return scheduleTime >= startDay && scheduleTime <= dayAfterWeek;
      } catch {
        return false;
      }
    });
  });

  return {
    applicationsToShow,
    isPending,
    isError,
    selectedIndex,
    refreshApplicationListCache,
    thisWeekSchedule,
  };
};
