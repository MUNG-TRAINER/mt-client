import { applicationAPI } from "@/apis/applications/applicationAPI";
import type { ApplicationStatusUpdateRequest } from "@/types/applications/applicationType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      data,
    }: {
      applicationId: number;
      data: ApplicationStatusUpdateRequest;
    }) => applicationAPI.updateApplicationStatus(applicationId, data),
    onSuccess: () => {
      // 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["pendingApplications"] });
    },
  });
}
