"use client";
import {applicationAPI} from "@/apis/applications/applicationAPI";
import type {PendingApplication} from "@/types/applications/applicationType";
import {useQuery} from "@tanstack/react-query";

export default function usePendingApplications() {
  const {data, isPending, isError, refetch} = useQuery<PendingApplication[]>({
    queryKey: ["pendingApplications"],
    queryFn: applicationAPI.getPendingApplications,
  });

  return {data: data || [], isPending, isError, refetch};
}
