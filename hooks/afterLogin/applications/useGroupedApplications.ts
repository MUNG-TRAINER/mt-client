"use client";
import { applicationAPI } from "@/apis/applications/applicationAPI";
import type { GroupedApplication } from "@/types/applications/applicationType";
import type { LessonFormFilter } from "@/types/applications/applicationFilterTypes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseGroupedApplicationsProps {
  lessonFormFilter?: LessonFormFilter;
}

export default function useGroupedApplications({
  lessonFormFilter = "ALL",
}: UseGroupedApplicationsProps = {}) {
  const { data, isPending, isError, refetch } = useQuery<GroupedApplication[]>({
    queryKey: ["groupedApplications"],
    queryFn: applicationAPI.getGroupedApplications,
  });

  // lessonForm으로 필터링
  const filteredData = useMemo(() => {
    if (!data || lessonFormFilter === "ALL") {
      return data || [];
    }

    return data.filter(
      (application) => application.lessonForm === lessonFormFilter
    );
  }, [data, lessonFormFilter]);

  return { data: filteredData, isPending, isError, refetch };
}
