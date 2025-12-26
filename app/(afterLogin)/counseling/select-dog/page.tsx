import SelectDogForCounseling from "@/components/pages/afterLogin/counseling/SelectDogForCounseling";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담 신청 - 반려견 선택",
};

export default async function Page() {
  return <SelectDogForCounseling />;
}
