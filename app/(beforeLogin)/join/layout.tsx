import JoinStateComp from "@/components/pages/beforeLogin/join/JoinStateComp";
import {Metadata} from "next";
import Link from "next/link";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "회원가입",
  description: "회원가입하고 멍스쿨에서 반려견 훈련을 시작해보아요.",
  openGraph: {
    type: "website",
    title: "회원가입 | 멍스쿨",
    description: "회원가입하고 멍스쿨에서 반려견 훈련을 시작해보아요.",
    siteName: "멍스쿨",
    url: "/도메인작성",
    images: [{url: "/pwa-logos/icon-144x144.png"}],
  },
  twitter: {
    title: "회원가입 | 멍스쿨",
    card: "summary",
    description: "회원가입하고 멍스쿨에서 반려견 훈련을 시작해보아요.",
    images: "/pwa-logos/icon-144x144.png",
  },
  alternates: {
    canonical: "https://도메인/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};
export default function layout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col p-6 gap-2 h-full overflow-y-auto overflow-x-hidden">
      <h2 className="text-center text-2xl font-dohyeon">회원가입</h2>
      <p className="text-center text-sm text-(--mt-gray)">
        계정을 생성하여 서비스를 이용하세요
      </p>
      <JoinStateComp />
      {children}
      <p className="flex items-center gap-2 justify-center text-center text-sm font-semibold text-(--mt-gray)">
        회원이신가요?
        <Link href={"/login"} className="text-(--mt-blue)">
          로그인
        </Link>
      </p>
    </div>
  );
}
