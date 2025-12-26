"use client";

import {trainerUserApi} from "@/apis/trainer/trainerUserApi";
import {useQuery} from "@tanstack/react-query";

export default function useGetDogStats({dogId}: {dogId: number}) {
  const {
    data: statsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dogStats", dogId],
    queryFn: () => trainerUserApi.getDogStats(dogId),
    enabled: !!dogId,
  });
  return {statsData, isLoading, error};
}
