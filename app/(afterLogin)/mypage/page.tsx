import MyPage from "@/components/pages/afterLogin/MyPage";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "마이페이지",
};

export default async function Page() {
  return <MyPage />;
}
