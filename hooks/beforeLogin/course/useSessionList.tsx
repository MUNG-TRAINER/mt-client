import { courseAPI } from "@/apis/course/courseApi";
import { ISessionType } from "@/types/course/sessionType";
import { useQuery } from "@tanstack/react-query";

export default function useSessionList(courseId: string) {
  const { data, isPending, isError } = useQuery<ISessionType[]>({
    queryKey: ["sessionList", courseId],
    queryFn: () => courseAPI.getSessionList(courseId),
    enabled: !!courseId,
  });

  return { data, isPending, isError };
}
