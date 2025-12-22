import Application from "@/components/pages/afterLogin/applications/Application";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "나의 신청내역",
};

export default async function ApplicationsPage() {
  return <Application />;
}
