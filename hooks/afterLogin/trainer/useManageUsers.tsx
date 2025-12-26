"use client";
import {trainerUserApi} from "@/apis/trainer/trainerUserApi";
import {useQuery} from "@tanstack/react-query";

export default function useManageUsers() {
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainerUsers"],
    queryFn: trainerUserApi.getTrainerUsers,
  });
  return {users, isLoading, error};
}
