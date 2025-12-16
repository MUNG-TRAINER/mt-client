import CreateDogForm from "@/components/pages/afterLogin/dog/CreateDogForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "반려견 등록",
};

export default async function Page() {
  return <CreateDogForm />;
}
