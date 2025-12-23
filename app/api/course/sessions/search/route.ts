import { NextRequest } from "next/server";
import { fetchCourseAPI } from "@/util/api/courseRouteHelper";

// GET /api/course/sessions/search - 훈련 세션 검색 (회차별 - 캘린더용)
export async function GET(req: NextRequest) {
  return fetchCourseAPI({
    req,
    endpoint: "/course/sessions/search",
    allowedParams: [
      "keyword",
      "lastSessionId",
      "size",
      "lessonForm",
      "year",
      "month",
      "day",
    ],
    errorMessage: "훈련 세션 검색에 실패했습니다.",
  });
}
