"use client";
import {XMarkIcon} from "@/components/icons/xMark";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import useLogout from "@/hooks/afterLogin/users/useLogout";
import {useDrawer} from "@/stores/drawerState";
import {useRouter} from "next/navigation";

export default function DrawerHeader() {
  const router = useRouter();
  const {offToggle} = useDrawer();
  const {data: check, resetUserCheck} = useCheckLoggedIn();
  const {refetch} = useLogout();
  // functions
  /* 로그인페이지 이동 */
  const goToLogin = () => {
    router.push("/login");
    offToggle();
  };
  const handleLogout = async () => {
    await refetch();
    resetUserCheck();
    offToggle();
    router.push("/");
  };
  return (
    <>
      <li>
        <button onClick={offToggle}>
          <i>
            <XMarkIcon className="size-10 text-(--mt-white)" />
          </i>
        </button>
      </li>
      {!check ? (
        <li>
          <button
            onClick={goToLogin}
            className="bg-(--mt-white) px-2 py-1 rounded-lg font-semibold text-sm hover:bg-(--mt-blue-light) hover:outline-2 hover:outline-(--mt-blue-point) transition-colors ease-in-out duration-200"
          >
            로그인
          </button>
        </li>
      ) : (
        <li>
          <button
            onClick={handleLogout}
            className="bg-(--mt-white) px-2 py-1 rounded-lg font-semibold text-sm hover:bg-(--mt-blue-light) hover:outline-2 hover:outline-(--mt-blue-point) transition-colors ease-in-out duration-200"
          >
            로그아웃
          </button>
        </li>
      )}
    </>
  );
}
