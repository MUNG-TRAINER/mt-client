import MyDogs from "@/components/pages/afterLogin/dog/MyDogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 반려견",
};

export default async function Page() {
  return <MyDogs />;
}
