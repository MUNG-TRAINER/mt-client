import {NextRequest, NextResponse} from "next/server";

export async function proxy(request: NextRequest) {
  const cookieStore = request.cookies.toString();
  const ACCESS_TOKEN = request.cookies.get("access_token")?.value;
  const REFRESH_TOKEN = request.cookies.get("refresh_token")?.value;
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
