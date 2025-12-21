import ChangePassword from "@/components/pages/afterLogin/mypage/ChangePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 변경",
};

export default async function Page() {
  return <ChangePassword />;
}
