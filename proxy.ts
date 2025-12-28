import {NextRequest, NextResponse} from "next/server";
import {NAME_ACCESS_TOKEN, NAME_REFRESH_TOKEN} from "./util/cookieExtractor";

const publicRoute: Record<string, boolean> = {
  "/": true,
  "/login": true,
  "/join": true,
};
const authRoute: Record<string, boolean> = {
  "/login": true,
  "/join": true,
};
const isCourseDetailPage = (path: string) => {
  const courseDetailPage = /^\/course\/\d+$/;
  return courseDetailPage.test(path);
};
export function proxy(request: NextRequest) {
  const REFRESH_TOKEN = request.cookies.get(NAME_REFRESH_TOKEN)?.value;
  const ACCESS_TOKEN = request.cookies.get(NAME_ACCESS_TOKEN)?.value;
  const {pathname} = request.nextUrl;

  if (isCourseDetailPage(pathname)) {
    return NextResponse.next();
  }
  if (publicRoute[pathname]) {
    return NextResponse.next();
  }

  if (ACCESS_TOKEN && REFRESH_TOKEN) {
    if (authRoute[pathname]) {
      const home = new URL("/", request.url);
      return NextResponse.redirect(home);
    }
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
