import { useQuery } from "@tanstack/react-query";
import { counselingApi } from "@/apis/counseling/counselingApi";

/**
 * 상담 리스트 조회 훅
 */
export const useCounselingList = (completed: boolean) => {
  return useQuery({
    queryKey: ["counseling", "list", completed],
    queryFn: () => counselingApi.getCounselingDogs(completed),
  });
};
