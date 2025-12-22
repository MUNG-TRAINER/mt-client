"use client";
import {BellIcon} from "@/components/icons/bells";
import {Hamburger3Icon} from "@/components/icons/hamburger";
import Link from "next/link";
import {useDrawer} from "@/stores/drawerState";
import {usePathname, useRouter} from "next/navigation";
import {ChevronLeftIcon} from "@/components/icons/chevron";

const notAllowBackBtn: {[key: string]: boolean} = {
  "/": true,
  "/login": true,
  "/join": true,
};

export default function HeaderNav() {
  const {onToggle} = useDrawer();
  const path = usePathname();
  const router = useRouter();
  return (
    <>
      {!notAllowBackBtn[path] && (
        <li className="flex justify-center items-center">
          <button onClick={() => router.back()}>
            <ChevronLeftIcon className="size-6 text-(--mt-white)" />
          </button>
        </li>
      )}
      <li>
        <Link href={"/"}>
          <h3 className="font-dohyeon text-(--mt-white)">MUNG&apos;s COOL</h3>
        </Link>
      </li>
      <li className="ml-auto">
        <i>
          <BellIcon className="size-6 text-white" />
        </i>
      </li>
      <li>
        <button onClick={onToggle}>
          <i>
            <Hamburger3Icon className="size-6 text-white" />
          </i>
        </button>
      </li>
    </>
  );
}
