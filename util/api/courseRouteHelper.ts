import {NextResponse} from "next/server";

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
  requiredParams?: {name: AllowedParams; errorMessage: string}[];
}

/**
 * 쿼리 파라미터를 빌드하고 필수 파라미터를 검증합니다.
 */
export function buildQueryParams({
  searchParams,
  allowedParams,
  requiredParams = [],
}: BuildQueryParamsOptions): {params: URLSearchParams; error?: NextResponse} {
  const params = new URLSearchParams();

  // 필수 파라미터 검증
  for (const {name, errorMessage} of requiredParams) {
    const value = searchParams.get(name);
    if (!value) {
      return {
        params,
        error: NextResponse.json({error: errorMessage}, {status: 400}),
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

  return {params};
}
