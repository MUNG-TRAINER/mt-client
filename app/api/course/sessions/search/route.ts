import {buildQueryParams} from "@/util/api/courseRouteHelper";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

// GET /api/course/sessions/search - 훈련 세션 검색 (회차별 - 캘린더용)
export async function GET(req: NextRequest) {
  try {
    const cookie = await cookies();
    const {searchParams} = new URL(req.url);

    // 쿼리 파라미터 빌드 및 검증
    const {params, error} = buildQueryParams({
      searchParams,
      allowedParams: [
        "keyword",
        "lastSessionId",
        "size",
        "lessonForm",
        "year",
        "month",
        "day",
      ],
      requiredParams: [],
    });

    if (error) {
      return error;
    }

    // URL 생성
    const queryString = params.toString();
    const url = queryString
      ? `${API_BASE_URL}/course/sessions/search?${queryString}`
      : `${API_BASE_URL}/course/sessions/search}`;

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
        .catch(() => ({message: "훈련 세션 검색에 실패했습니다."}));
      return NextResponse.json(
        {error: errorData.message || "훈련 세션 검색에 실패했습니다."},
        {status: res.status},
      );
    }

    // 성공 응답
    const data = await res.json();
    console.log(data);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {error: "훈련 세션 검색에 실패했습니다."},
      {status: 500},
    );
  }
}
