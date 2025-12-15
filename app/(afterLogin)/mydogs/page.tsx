import MyDogs from "@/components/pages/afterLogin/MyDogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 반려견",
};

export default async function Page() {
  return <MyDogs />;
}
