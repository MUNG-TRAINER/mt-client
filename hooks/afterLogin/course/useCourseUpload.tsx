import {courseApi} from "@/apis/training/courseApi";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function useCourseUpload() {
  const router = useRouter();
  const {mutate, isPending, isError} = useMutation({
    mutationKey: ["courseUpload"],
    mutationFn: async ({
      formData,
      count,
    }: {
      formData: FormData;
      count: number;
    }) => await courseApi.createCourse(formData, count),
    onSuccess: () => {
      router.push(`/plan`);
    },
  });
  return {mutate, isPending, isError};
}
