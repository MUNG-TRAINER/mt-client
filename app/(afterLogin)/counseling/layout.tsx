import RoleGuard from "@/components/shared/auth/RoleGuard";
import {ReactNode} from "react";
export default async function UserCounselingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <RoleGuard allowedRoles={["TRAINER"]}>{children}</RoleGuard>;
}
