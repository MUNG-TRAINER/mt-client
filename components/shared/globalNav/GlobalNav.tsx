"use client";
import {CalendarDaysIcon} from "@/components/icons/calendar";
import {HomeIcon} from "@/components/icons/home";
import {MagnifyingGlassIcon} from "@/components/icons/search";
import {StarIcon} from "@/components/icons/start";
import {UserIcon} from "@/components/icons/user";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ReactNode, useEffect} from "react";

interface IGlobalNavListProps {
  to: string;
  icon: ReactNode;
  txt: string;
}
function GlobalNavList({to, txt, icon}: IGlobalNavListProps) {
  const path = usePathname();
  return (
    <li>
      <Link
        href={to}
        className={`${path === to && "text-(--mt-blue-point)"} flex flex-col gap-1 items-center justify-center`}
      >
        <i>{icon}</i>
        <span className="text-nowrap">{txt}</span>
      </Link>
    </li>
  );
}

export default function GlobalNav() {
  const pathname = usePathname();
  const {role, forceRefresh} = useCheckLoggedIn();
  const isTrainer = role === "TRAINER";
  const isUser = role === "USER";

  useEffect(() => {
    if (role === null) {
      forceRefresh();
    }
  }, [forceRefresh, pathname, role]);

  return (
    <nav className="p-5 bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.2)]">
      <ul className="flex justify-between *:[&>a]:flex *:[&>a]:flex-col *:[&>a]:justify-center *:[&>a]:items-center *:[&>a]:gap-1  *:[&>a]:w-10 *:[&>a>i]:size-6">
        <GlobalNavList to="/" txt="홈" icon={<HomeIcon />} />
        <GlobalNavList to="/plan" txt="일정" icon={<CalendarDaysIcon />} />
        <GlobalNavList
          to="/course/search"
          txt="검색"
          icon={<MagnifyingGlassIcon />}
        />
        {isTrainer && (
          <GlobalNavList
            to="/trainer/user-management"
            txt="회원관리"
            icon={<StarIcon />}
          />
        )}
        {isUser && (
          <GlobalNavList to="/wishlist" txt="찜" icon={<StarIcon />} />
        )}
        <GlobalNavList to="/mypage" txt="MY" icon={<UserIcon />} />
      </ul>
    </nav>
  );
}
