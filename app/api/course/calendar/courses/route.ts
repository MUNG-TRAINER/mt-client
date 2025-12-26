import {buildQueryParams} from "@/util/api/courseRouteHelper";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

// GET /api/course/calendar/courses - 특정 날짜의 코스 목록 조회
export async function GET(req: NextRequest) {
  try {
    const cookie = await cookies();
    const {searchParams} = new URL(req.url);

    // 쿼리 파라미터 빌드 및 검증
    const {params, error} = buildQueryParams({
      searchParams,
      allowedParams: ["date", "keyword", "lessonForm"],
      requiredParams: [{name: "date", errorMessage: "날짜는 필수입니다."}],
    });

    if (error) {
      return error;
    }

    // URL 생성
    const queryString = params.toString();
    const url = queryString
      ? `${API_BASE_URL}/course/calendar/courses?${queryString}`
      : `${API_BASE_URL}/course/calendar/courses}`;
    // API 요청
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookie.toString(),
        "Content-Type": "application/json",
      },
    });

    // 에러 처리
    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({message: "코스 목록을 불러오는데 실패했습니다."}));
      return NextResponse.json(
        {error: errorData.message || "코스 목록을 불러오는데 실패했습니다."},
        {status: res.status},
      );
    }

    // 성공 응답
    const data = await res.json();
    console.log(data);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {error: "코스 목록을 불러오는데 실패했습니다."},
      {status: 500},
    );
  }
}
