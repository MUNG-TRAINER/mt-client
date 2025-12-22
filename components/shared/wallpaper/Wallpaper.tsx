"use client";
import {ReactNode, useEffect, useState} from "react";
import Drawer from "../drawer/Drawer";
import back_1 from "@/public/images/home/back_1.jpg";
import back_2 from "@/public/images/home/back_2.jpg";
import back_3 from "@/public/images/home/back_3.jpg";
import Image from "next/image";

export default function Wallpaper({children}: {children: ReactNode}) {
  const [translate, setTranslate] = useState(0);
  const moving = () => {
    setInterval(() => {
      setTranslate((prev) => {
        if (prev >= 66.666666) {
          return 0;
        }
        return prev + 33.333333;
      });
    }, 5000);
  };
  useEffect(() => {
    moving();
    return () => moving();
  }, []);
  return (
    <div className="w-full h-full">
      <div className="absolute z-60 text-(--mt-white) xl:left-[3%] 2xl:left-[10%] top-[35%] p-10 rounded-lg bg-(--mt-black)/75 hidden xl:block transition-normal ease-in-out duration-200">
        <h2 className="font-dohyeon font-bold text-5xl">
          멍스쿨에 오신것을 환영합니다.
        </h2>
      </div>
      <div>
        <ul
          className="absolute left-0 flex h-full w-[300%] transition-transform duration-500 ease-in-out brightness-80"
          style={{transform: `translateX(-${translate}%)`}}
        >
          <li className="relative size-full w-full h-full">
            <Image
              src={back_1}
              alt="배경화면_1"
              fill
              sizes="100"
              placeholder="blur"
            />
          </li>
          <li className="relative size-full w-full h-full">
            <Image
              src={back_2}
              alt="배경화면_1"
              fill
              sizes="100"
              placeholder="blur"
            />
          </li>
          <li className="relative size-full w-full h-full">
            <Image
              src={back_3}
              alt="배경화면_1"
              fill
              sizes="100"
              placeholder="blur"
            />
          </li>
        </ul>
      </div>
      <Drawer />
      {children}
    </div>
  );
}
