import {NAME_ACCESS_TOKEN, NAME_REFRESH_TOKEN} from "@/util/cookieExtractor";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {ReactNode} from "react";
export default async function AfterLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const hasRefreshToken = !!cookieStore.get(NAME_REFRESH_TOKEN)?.value;
  const hasAccessToken = !!cookieStore.get(NAME_ACCESS_TOKEN)?.value;

  // 로그인 상태 체크는 (afterLogin)에서 한 번만: 스프링 /auth/check 호출 대신 쿠키 유무로 판별
  if (!hasRefreshToken && !hasAccessToken) {
    redirect("/login");
  }
  return <>{children}</>;
}
