import MyPageEdit from "@/components/pages/afterLogin/mypage/MyPageEdit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지 수정",
};

export default async function Page() {
  return <MyPageEdit />;
}
