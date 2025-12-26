import RoleGuard from "@/components/shared/auth/RoleGuard";
import {ReactNode} from "react";
export default async function CourseRegistLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <RoleGuard allowedRoles={["USER"]}>{children}</RoleGuard>;
}
