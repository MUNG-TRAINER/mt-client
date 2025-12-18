"use client";
import {ChevronDownIcon} from "@/components/icons/chevron";
import FloatingAddBtn from "@/components/shared/buttons/FloatingAddBtn";
import {useFloatingBtnState} from "@/stores/floatingBtnState";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import Link from "next/link";

export default function PlanFloatingBtn() {
  const {data} = useCheckLoggedIn();
  const {planPage, togglePlanPage} = useFloatingBtnState();
  return (
    <>
      <FloatingAddBtn btnState={planPage} clickFn={togglePlanPage} />
      <ul
        className={`fixed z-85 bottom-24 right-5 flex flex-col bg-(--mt-gray-light) w-52 space-y-1 rounded-md overflow-hidden transition-[height] duration-200 ease-in-out
          ${planPage ? "h-72 p-3" : "h-0"} font-bold
          *:px-3 *:py-1 *:hover:bg-(--mt-gray) *:hover:text-(--mt-white) *:rounded-md *:hover:shadow`}
      >
        {data && "role" in data && (
          <>
            {data.role === "TRAINER" && (
              <>
                <li>
                  <Link href={"/course/create-course"}>수업생성하기</Link>
                </li>
              </>
            )}
            {data.role === "USER" && (
              <>
                <li>
                  <Link href={"/"}>수업신청하기</Link>
                </li>
              </>
            )}
          </>
        )}
        <li className="mt-auto">
          <button onClick={togglePlanPage} className="flex items-center gap-2 ">
            <ChevronDownIcon className="size-5" />
            <span className="text-sm">닫기</span>
          </button>
        </li>
      </ul>
    </>
  );
}
