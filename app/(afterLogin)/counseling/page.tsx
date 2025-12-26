import MyCounselings from "@/components/pages/afterLogin/counseling/MyCounselings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 상담",
};

export default async function Page() {
  return <MyCounselings />;
}
