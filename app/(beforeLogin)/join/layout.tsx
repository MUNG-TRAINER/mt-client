import JoinStateComp from "@/components/pages/beforeLogin/join/JoinStateComp";
import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "회원가입",
};
export default function layout({children}: {children: ReactNode}) {
  return (
    <>
      <h2 className="text-center text-2xl font-dohyeon">회원가입</h2>
      <p className="text-center text-sm text-(--mt-gray)">
        계정을 생성하여 서비스를 이용하세요
      </p>
      <JoinStateComp />
      {children}
    </>
  );
}
