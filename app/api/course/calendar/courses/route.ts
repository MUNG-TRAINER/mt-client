import { NextRequest } from "next/server";
import { fetchCourseAPI } from "@/util/api/courseRouteHelper";

// GET /api/course/calendar/courses - 특정 날짜의 코스 목록 조회
export async function GET(req: NextRequest) {
  return fetchCourseAPI({
    req,
    endpoint: "/course/calendar/courses",
    allowedParams: ["date", "keyword", "lessonForm"],
    requiredParams: [{ name: "date", errorMessage: "날짜는 필수입니다." }],
    errorMessage: "코스 목록을 불러오는데 실패했습니다.",
  });
}
