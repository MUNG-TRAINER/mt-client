import { trainerApi } from "@/apis/trainer/trainerApi";
import { ITrainerInfoType } from "@/types/trainer/trainerType";
import { useQuery } from "@tanstack/react-query";

export default function useTrainerProfile(trainerId: string) {
  const { data, isPending, isError } = useQuery<ITrainerInfoType>({
    queryKey: ["trainerProfile", trainerId],
    queryFn: () => trainerApi.getProfile(trainerId),
    enabled: !!trainerId,
  });

  return { data, isPending, isError };
}
