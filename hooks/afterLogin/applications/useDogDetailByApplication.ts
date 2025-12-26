"use client";
import {applicationAPI} from "@/apis/applications/applicationAPI";
import type {DogDetailResponse} from "@/types/applications/applicationType";
import {useQuery} from "@tanstack/react-query";

export default function useDogDetailByApplication(
  applicationId: number | null,
  options?: {enabled?: boolean},
) {
  const {data, isPending, isError} = useQuery<DogDetailResponse>({
    queryKey: ["dogDetailByApplication", applicationId],
    queryFn: () => {
      if (!applicationId) throw new Error("applicationId가 필요합니다.");
      return applicationAPI.getDogDetail(applicationId);
    },
    enabled: options?.enabled && !!applicationId,
  });

  return {data, isPending, isError};
}
