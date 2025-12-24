"use client";
import { useQuery } from "@tanstack/react-query";
import { counselingApi } from "@/apis/counseling/counselingApi";

export default function useCounselingDetail(counselingId: number) {
  return useQuery({
    queryKey: ["counseling", counselingId],
    queryFn: () => counselingApi.getCounselingDetail(counselingId),
    enabled: !!counselingId,
  });
}
