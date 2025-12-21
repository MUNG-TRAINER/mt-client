import {Metadata} from "next";
import Image from "next/image";
import {ReactNode} from "react";
import logo_slogun_white from "@/public/logos/logo_svg_white.svg";
import Link from "next/link";
import {ChatBubbleOvalLeftIcon} from "@/components/icons/chat";

export const metadata: Metadata = {
  title: "로그인",
};

export default function layout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="bg-(--mt-blue) p-5 rounded-full size-20">
        <Image src={logo_slogun_white} alt="로고이미지" />
      </div>
      <h2 className="text-2xl font-dohyeon">댕스쿨</h2>
      <p className="text-sm text-(--mt-gray)">반려견 훈련 플랫폼</p>
      {children}
      <p className="flex items-center gap-2 justify-center text-center text-sm font-semibold text-(--mt-gray)">
        아직 회원이 아니신가요?
        <Link href={"/join"} className="text-sm text-(--mt-blue) font-bold">
          회원가입
        </Link>
      </p>
      <div className="flex justify-center items-center w-full [&>div]:h-[0.5px] [&>div]:w-full [&>div]:bg-(--mt-gray-point)">
        <div />
        <span className="text-nowrap p-3 text-(--mt-gray) text-xs">또는</span>
        <div />
      </div>
      <div className="flex justify-center items-center gap-3 w-full rounded-lg bg-[#FEE500] py-2 shadow-md *:font-bold">
        <ChatBubbleOvalLeftIcon className="size-8" />
        <Link href={"/"} className="text-nowrap">
          카카오톡으로 로그인
        </Link>
      </div>
    </div>
  );
}
