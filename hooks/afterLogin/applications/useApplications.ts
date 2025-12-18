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
        app.applicationStatus === "WAITING"
    ) || [];

  const completedApplications =
    data?.filter(
      (app) =>
        app.applicationStatus === "ACCEPT" ||
        app.applicationStatus === "REJECTED" ||
        app.applicationStatus === "CANCELLED"
    ) || [];

  const applicationsToShow =
    activeTab === "pending" ? pendingApplications : completedApplications;

  const refreshApplicationListCache = () => {
    queryClient.invalidateQueries({queryKey: ["applicationList"]});
  };

  return {
    applicationsToShow,
    isPending,
    isError,
    selectedIndex,
    refreshApplicationListCache,
  };
};
