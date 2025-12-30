"use client";
import {applicationAPI} from "@/apis/applications/applicationAPI";
import type {BulkStatusUpdateRequest} from "@/types/applications/applicationType";
import {useMutation} from "@tanstack/react-query";

export default function useBulkUpdateStatus() {
  return useMutation({
    mutationFn: ({
      courseId,
      dogId,
      data,
    }: {
      courseId: number;
      dogId: number;
      data: BulkStatusUpdateRequest;
    }) => applicationAPI.bulkUpdateApplicationStatus(courseId, dogId, data),
  });
}
