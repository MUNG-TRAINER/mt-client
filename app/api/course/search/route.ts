import { NextRequest } from "next/server";
import { fetchCourseAPI } from "@/util/api/courseRouteHelper";

// GET /api/course/search - 훈련 과정 검색
export async function GET(req: NextRequest) {
  return fetchCourseAPI({
    req,
    endpoint: "/course/search",
    allowedParams: ["keyword", "lastCourseId", "size", "lessonForm"],
    errorMessage: "훈련 과정 검색에 실패했습니다.",
  });
}
