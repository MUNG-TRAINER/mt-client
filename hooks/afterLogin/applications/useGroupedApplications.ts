"use client";
import {applicationAPI} from "@/apis/applications/applicationAPI";
import type {GroupedApplication} from "@/types/applications/applicationType";
import {useQuery} from "@tanstack/react-query";

export default function useGroupedApplications() {
  const {data, isPending, isError, refetch} = useQuery<GroupedApplication[]>({
    queryKey: ["groupedApplications"],
    queryFn: applicationAPI.getGroupedApplications,
  });

  return {data: data || [], isPending, isError, refetch};
}
