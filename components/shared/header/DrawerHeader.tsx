"use client";
import {XMarkIcon} from "@/components/icons/xMark";
import {useDrawer} from "@/stores/drawerState";
import Link from "next/link";

export default function DrawerHeader() {
  const {offToggle} = useDrawer();
  return (
    <>
      <li>
        <button onClick={offToggle}>
          <i>
            <XMarkIcon className="size-10 text-(--mt-white)" />
          </i>
        </button>
      </li>
      <li>
        <Link href={"/login"}>로그인</Link>
      </li>
    </>
  );
}
