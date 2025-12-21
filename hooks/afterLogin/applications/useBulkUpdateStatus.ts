import { applicationAPI } from "@/apis/applications/applicationAPI";
import type { BulkStatusUpdateRequest } from "@/types/applications/applicationType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useBulkUpdateStatus() {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      // 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["groupedApplications"] });
    },
  });
}
