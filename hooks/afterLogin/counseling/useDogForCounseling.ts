"use client";
import { useQuery } from "@tanstack/react-query";
import { counselingApi } from "@/apis/counseling/counselingApi";

export default function useDogForCounseling(dogId: number) {
  return useQuery({
    queryKey: ["dog", "counseling", dogId],
    queryFn: () => counselingApi.getDogForCounseling(dogId),
    enabled: !!dogId,
  });
}
