"use client";
import {ReactNode} from "react";
import Image from "next/image";
import Drawer from "../drawer/Drawer";
import back_1 from "@/public/images/home/bg_back.png";
import back_2 from "@/public/images/home/bg_text.png";

export default function Wallpaper({children}: {children: ReactNode}) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src={back_1}
        alt="배경"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* 텍스트(전경) 이미지 */}
      <div className="absolute top-25 left-80 z-10 flex items-center justify-center pointer-events-none">
        <Image
          src={back_2}
          alt="텍스트 배경"
          priority
          sizes="(min-width: 1280px) 900px, 80vw"
          className="
            w-[80vw]
            max-w-[900px]
            h-auto
          "
        />
      </div>

      {/* UI / 콘텐츠 */}
      <div className="relative z-20 h-full">
        <Drawer />
        {children}
      </div>
    </div>
  );
}
