export const NAME_ACCESS_TOKEN = "access_token";
export const NAME_REFRESH_TOKEN = "refresh_token";

export function cookieExtractor(cookies: string[]) {
  let accessToken = "";
  let refreshToken = "";
  let accessMaxAge = "";
  let refreshMaxAge = "";

  for (const cookie of cookies) {
    const parts = cookie.split(";").map((p) => p.trim());

    const [name, value] = parts[0].split("=");

    const maxAgePart = parts.find((p) => p.startsWith("Max-Age="));
    const maxAge = maxAgePart ? maxAgePart.split("=")[1] : undefined;

    if (name === NAME_ACCESS_TOKEN) {
      accessToken = value;
      accessMaxAge = maxAge ?? "";
    }

    if (name === NAME_REFRESH_TOKEN) {
      refreshToken = value;
      refreshMaxAge = maxAge ?? "";
    }
  }

  if (!accessToken || !refreshToken) {
    throw new Error(
      "필요한 인증 쿠키(access_token, refresh_token)를 찾을 수 없습니다"
    );
  }
  return {
    ACCESS_TOKEN: accessToken,
    REFRESH_TOKEN: refreshToken,
    accessMaxAge,
    refreshMaxAge,
  };
}
