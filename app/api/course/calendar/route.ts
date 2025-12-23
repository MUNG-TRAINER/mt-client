import { NextRequest } from "next/server";
import { fetchCourseAPI } from "@/util/api/courseRouteHelper";

// GET /api/course/calendar - 달력 조회 (세션 날짜 목록)
export async function GET(req: NextRequest) {
  return fetchCourseAPI({
    req,
    endpoint: "/course/calendar",
    allowedParams: ["startDate", "endDate", "keyword", "lessonForm"],
    requiredParams: [
      {
        name: "startDate",
        errorMessage: "시작 날짜와 종료 날짜는 필수입니다.",
      },
      { name: "endDate", errorMessage: "시작 날짜와 종료 날짜는 필수입니다." },
    ],
    errorMessage: "달력 데이터를 불러오는데 실패했습니다.",
  });
}
