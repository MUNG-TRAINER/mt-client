"use client";
import {useDrawer} from "@/stores/drawerState";
import DrawerHeader from "../header/DrawerHeader";
import HeaderBar from "../header/HeaderBar";
import Link from "next/link";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";

export default function Drawer() {
  const {toggle, offToggle} = useDrawer();
  const {data} = useCheckLoggedIn();

  const publicAfterLink = data &&
    "role" in data && [{href: "/mypage", label: "마이페이지"}];
  const userLink =
    data && "role" in data
      ? data.role === "USER" && [
          {href: "/applications", label: "나의 신청내역 보기"},
          {href: "/counseling", label: "나의 상담"},
        ]
      : null;

  const link = [
    {href: "/", label: "홈"},
    ...(publicAfterLink ? [...publicAfterLink] : []),
    ...(userLink ? [...userLink] : []),
    // {href: "/", label: "s"},
    {href: "/introduce", label: "멍스쿨소개"},
  ];

  return (
    <>
      {toggle && (
        <div className="absolute z-95 bg-(--mt-black)/70 w-full h-full" />
      )}
      <div
        className={`absolute left-0 top-0 z-99 w-full h-full flex justify-end transition-transform ease-in-out duration-300 ${
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
    </>
  );
}
