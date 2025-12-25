"use client";

import {trainerUserApi} from "@/apis/trainer/trainerUserApi";
import {useQuery} from "@tanstack/react-query";

export default function useGetUserDogs({userId}: {userId: number}) {
  const {
    data: dogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDogs", userId],
    queryFn: () => trainerUserApi.getUserDogs(userId),
    enabled: !!userId,
  });
  return {dogs, isLoading, error};
}
