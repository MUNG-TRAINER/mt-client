"use client";
import {useDrawer} from "@/stores/drawerState";
import DrawerHeader from "../header/DrawerHeader";
import HeaderBar from "../header/HeaderBar";
import Link from "next/link";

export default function Drawer() {
  const {toggle, offToggle} = useDrawer();
  const link = [
    {href: "/", label: "홈"},
    {href: "/mypage", label: "마이페이지"},
    {href: "/mytrain", label: "나의훈련보기"},
    {href: "/wishlist", label: "찜리스트"},
    {href: "/introduce", label: "멍선생소개"},
  ];
  return (
    <div
      className={`absolute left-0 top-0 z-99 bg-(--mt-black)/70 w-full h-full flex justify-end transition-transform ease-in-out duration-300 ${
        toggle ? "" : "translate-x-full"
      }`}
    >
      <div
        onClick={offToggle}
        className="w-full h-full absolute top-0 left-0"
      />
      <div className="flex flex-col w-80 relative z-99">
        <HeaderBar className="bg-(--mt-blue)">
          <DrawerHeader />
        </HeaderBar>
        <section className="bg-(--mt-white) h-full">
          <nav className="p-5">
            <ul className="flex flex-col gap-10">
              {link.map((val, index) => (
                <li key={index}>
                  <Link href={val.href} onClick={offToggle}>
                    {val.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
    </div>
  );
}
