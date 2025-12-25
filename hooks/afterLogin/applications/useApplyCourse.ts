"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationAPI } from "@/apis/applications/applicationAPI";
import { ApplicationType } from "@/types/applications/applicationsType";

export const useApplyCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApplicationType[],
    Error,
    { courseId: number; data: Partial<ApplicationType> }
  >({
    mutationFn: ({ courseId, data }) =>
      applicationAPI.applyCourse(courseId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicationList"] });
    },
  });
};
