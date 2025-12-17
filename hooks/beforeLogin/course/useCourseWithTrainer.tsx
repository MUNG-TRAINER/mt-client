import { courseAPI } from "@/apis/course/courseApi";
import { ICourseType } from "@/types/course/courseType";
import { useQuery } from "@tanstack/react-query";
import useTrainerProfile from "../trainer/useTrainerProfile";

export default function useCourseWithTrainer(courseId: string) {
  const courseQuery = useQuery<ICourseType>({
    queryKey: ["courseDetail", courseId],
    queryFn: () => courseAPI.getCourseDetail(courseId),
    enabled: !!courseId,
  });

  const trainerId = courseQuery.data?.trainerId;
  const trainerQuery = useTrainerProfile(trainerId ? String(trainerId) : ""); // 내부 enabled: !!trainerId

  return {
    course: courseQuery.data,
    courseIsPending: courseQuery.isPending,
    courseIsError: courseQuery.isError,
    trainer: trainerQuery.data,
    trainerIsPending: trainerQuery.isPending,
    trainerIsError: trainerQuery.isError,
  };
}
