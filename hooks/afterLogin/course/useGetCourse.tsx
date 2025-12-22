import {courseApi} from "@/apis/training/courseApi";
import {ICourseType} from "@/types/course/courseType";
import {useQuery} from "@tanstack/react-query";

export default function useGetCourse() {
  const {data, isError, isPending} = useQuery<ICourseType[]>({
    queryKey: ["getCourse"],
    queryFn: () => courseApi.getCourse(),
  });
  return {data, isError, isPending};
}
