import RoleGuard from "@/components/shared/auth/RoleGuard";
import {ReactNode} from "react";
export default async function UserWishListLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <RoleGuard allowedRoles={["USER"]}>{children}</RoleGuard>;
}
