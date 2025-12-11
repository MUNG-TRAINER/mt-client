"use client";
import {BellIcon} from "@/components/icons/bells";
import {Hamburger3Icon} from "@/components/icons/hamburger";
import Link from "next/link";
import {useDrawer} from "@/stores/drawerState";

export default function HeaderNav() {
  const {onToggle} = useDrawer();
  return (
    <>
      <li>
        <Link href={"/"}>
          <h3 className="font-dohyeon text-(--mt-white)">DAENG&apos;S COOL</h3>
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
