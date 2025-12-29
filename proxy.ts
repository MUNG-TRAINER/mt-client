import {NextRequest, NextResponse} from "next/server";
import {NAME_ACCESS_TOKEN, NAME_REFRESH_TOKEN} from "./util/cookieExtractor";

const publicRoute = ["/", "/login", "/join"];

const authRoute = ["/login", "/join"];

const isCourseDetailPage = (path: string) => {
  const courseDetailPage = /^\/course\/\d+$/;
  return courseDetailPage.test(path);
};
export function proxy(request: NextRequest) {
  const REFRESH_TOKEN = request.cookies.get(NAME_REFRESH_TOKEN)?.value;
  const ACCESS_TOKEN = request.cookies.get(NAME_ACCESS_TOKEN)?.value;
  const {pathname} = request.nextUrl;

  if (
    ACCESS_TOKEN &&
    REFRESH_TOKEN &&
    authRoute.some((route) => pathname.startsWith(route))
  ) {
    const home = new URL("/", request.url);
    return NextResponse.redirect(home);
  }
  if (isCourseDetailPage(pathname)) {
    return NextResponse.next();
  }
  if (publicRoute.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!REFRESH_TOKEN) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (!ACCESS_TOKEN && !REFRESH_TOKEN) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|manifest.ts|manifest.webmanifest|service-worker.js|firebase-messaging-sw.js|_next/image|.*\\.png$).*)",
  ],
};
