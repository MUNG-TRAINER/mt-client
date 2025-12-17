import { courseAPI } from "@/apis/course/courseApi";
import { ICourseType } from "@/types/course/courseType";
import { useQuery } from "@tanstack/react-query";

export default function useCourseDetail(courseId: string) {
  const { data, isPending, isError } = useQuery<ICourseType>({
    queryKey: ["courseDetail", courseId],
    queryFn: () => courseAPI.getCourseDetail(courseId),
    enabled: !!courseId,
  });

  return { data, isPending, isError };
}
