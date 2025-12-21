"use client";

import {ApplicationType} from "@/types/applications/applicationsType";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {applicationAPI} from "@/apis/applications/applicationAPI";
import {useApplicationState} from "@/stores/applicationsState";

export const useApplications = () => {
  const {activeTab, selectedIndex} = useApplicationState();
  const queryClient = useQueryClient();
  const {data, isPending, isError} = useQuery<ApplicationType[]>({
    queryKey: ["applicationList"],
    queryFn: () => applicationAPI.getApplicationList(),
  });

  const pendingApplications =
    data?.filter(
      (app) =>
        app.applicationStatus === "APPLIED" ||
        app.applicationStatus === "WAITING" ||
        app.applicationStatus === "COUNSELING_REQUIRED",
    ) || [];

  const completedApplications =
    data?.filter(
      (app) =>
        app.applicationStatus === "ACCEPT" ||
        app.applicationStatus === "REJECTED" ||
        app.applicationStatus === "CANCELLED" ||
        app.applicationStatus === "EXPIRED",
    ) || [];

  const applicationsToShow =
    activeTab === "pending" ? pendingApplications : completedApplications;

  const refreshApplicationListCache = () => {
    queryClient.invalidateQueries({queryKey: ["applicationList"]});
  };

  const thisWeekSchedule = data?.filter((app) => {
    const now = new Date();
    const startDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();
    const dayAfterWeek = startDay + 7 * 24 * 60 * 60 * 100;
    const scheduleTime = new Date(app.schedule).getTime();
    return scheduleTime >= startDay && scheduleTime <= dayAfterWeek;
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
