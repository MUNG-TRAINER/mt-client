import JoinForm from "@/components/pages/beforeLogin/join/JoinForm";
import {Metadata} from "next";
export const metadata: Metadata = {
  title: "회원가입 | 멍스쿨",
};
export default function Page() {
  return <JoinForm />;
}
