import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * 허용된 쿼리 파라미터 목록
 */
type AllowedParams =
  | "keyword"
  | "lastCourseId"
  | "lastSessionId"
  | "size"
  | "lessonForm"
  | "year"
  | "month"
  | "day"
  | "startDate"
  | "endDate"
  | "date";

interface BuildQueryParamsOptions {
  searchParams: URLSearchParams;
  allowedParams: AllowedParams[];
  requiredParams?: { name: AllowedParams; errorMessage: string }[];
}

interface FetchCourseAPIOptions {
  req: NextRequest;
  endpoint: string;
  allowedParams: AllowedParams[];
  requiredParams?: { name: AllowedParams; errorMessage: string }[];
  errorMessage: string;
}

/**
 * 쿼리 파라미터를 빌드하고 필수 파라미터를 검증합니다.
 */
export function buildQueryParams({
  searchParams,
  allowedParams,
  requiredParams = [],
}: BuildQueryParamsOptions): { params: URLSearchParams; error?: NextResponse } {
  const params = new URLSearchParams();

  // 필수 파라미터 검증
  for (const { name, errorMessage } of requiredParams) {
    const value = searchParams.get(name);
    if (!value) {
      return {
        params,
        error: NextResponse.json({ error: errorMessage }, { status: 400 }),
      };
    }
    params.append(name, value);
  }

  // 선택적 파라미터 추가
  for (const param of allowedParams) {
    // 이미 필수 파라미터로 추가된 경우 스킵
    if (requiredParams.some((rp) => rp.name === param)) {
      continue;
    }
    if (searchParams.has(param)) {
      params.append(param, searchParams.get(param)!);
    }
  }

  return { params };
}

/**
 * Course API를 호출하는 공통 함수입니다.
 */
export async function fetchCourseAPI({
  req,
  endpoint,
  allowedParams,
  requiredParams = [],
  errorMessage,
}: FetchCourseAPIOptions): Promise<NextResponse> {
  try {
    const cookie = await cookies();
    const { searchParams } = new URL(req.url);

    // 쿼리 파라미터 빌드 및 검증
    const { params, error } = buildQueryParams({
      searchParams,
      allowedParams,
      requiredParams,
    });

    if (error) {
      return error;
    }

    // URL 생성
    const queryString = params.toString();
    const url = queryString
      ? `${API_BASE_URL}${endpoint}?${queryString}`
      : `${API_BASE_URL}${endpoint}`;

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
        .catch(() => ({ message: errorMessage }));
      return NextResponse.json(
        { error: errorData.message || errorMessage },
        { status: res.status }
      );
    }

    // 성공 응답
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
