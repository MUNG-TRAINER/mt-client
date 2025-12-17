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

    if (name === "access_token") {
      accessToken = value;
      accessMaxAge = maxAge ?? "";
    }

    if (name === "refresh_token") {
      refreshToken = value;
      refreshMaxAge = maxAge ?? "";
    }
  }

  if (!accessToken || !refreshToken) {
    throw new Error("Required auth cookies not found");
  }

  return {
    ACCESS_TOKEN: accessToken,
    REFRESH_TOKEN: refreshToken,
    accessMaxAge,
    refreshMaxAge,
  };
}
