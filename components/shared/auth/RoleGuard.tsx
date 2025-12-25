"use client";

import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import {UserRoleType} from "@/types/common/commonType";
import {useRouter} from "next/navigation";
import {ReactNode, useEffect} from "react";

type AllowedRole = Exclude<UserRoleType, undefined>;

export default function RoleGuard({
  allowedRoles,
  children,
  redirectTo = "/",
  unauthenticatedRedirectTo = "/login",
}: {
  allowedRoles: AllowedRole[];
  children: ReactNode;
  redirectTo?: string;
  unauthenticatedRedirectTo?: string;
}) {
  const router = useRouter();
  const {role, isPending, isError} = useCheckLoggedIn();

  useEffect(() => {
    if (isPending) return;

    // 로그인 쿠키는 있는데 세션이 깨진 경우 등
    if (isError || !role) {
      router.replace(unauthenticatedRedirectTo);
      return;
    }

    if (!allowedRoles.includes(role as AllowedRole)) {
      router.replace(redirectTo);
    }
  }, [allowedRoles, isError, isPending, role, router, redirectTo, unauthenticatedRedirectTo]);

  if (isPending) return null;

  if (!role) return null;

  if (!allowedRoles.includes(role as AllowedRole)) return null;

  return <>{children}</>;
}
