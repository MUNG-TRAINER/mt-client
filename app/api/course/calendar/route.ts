import {NextRequest, NextResponse} from "next/server";
import {buildQueryParams} from "@/util/api/courseRouteHelper";
import {cookies} from "next/headers";
import {API_BASE_URL} from "@/util/env";

// GET /api/course/calendar - 달력 조회 (세션 날짜 목록)
export async function GET(req: NextRequest) {
  try {
    const cookie = await cookies();
    const {searchParams} = new URL(req.url);

    // 쿼리 파라미터 빌드 및 검증
    const {params, error} = buildQueryParams({
      searchParams,
      allowedParams: ["startDate", "endDate", "keyword", "lessonForm"],
      requiredParams: [
        {
          name: "startDate",
          errorMessage: "시작 날짜와 종료 날짜는 필수입니다.",
        },
        {name: "endDate", errorMessage: "시작 날짜와 종료 날짜는 필수입니다."},
      ],
    });

    if (error) {
      return error;
    }

    // URL 생성
    const queryString = params.toString();
    const url = queryString
      ? `${API_BASE_URL}/course/calendar?${queryString}`
      : `${API_BASE_URL}/course/calendar}`;

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
        .catch(() => ({message: "달력 데이터를 불러오는데 실패했습니다."}));
      return NextResponse.json(
        {error: errorData.message || "달력 데이터를 불러오는데 실패했습니다."},
        {status: res.status},
      );
    }

    // 성공 응답
    const data = await res.json();
    console.log(data);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {error: "달력 데이터를 불러오는데 실패했습니다."},
      {status: 500},
    );
  }
}
